import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { saveToS3 } from "./aws";
import path from "path";
import { fetchDir, fetchFileContent, saveFile } from "./fs";
import { TerminalManager } from "./pty";
import chokidar from "chokidar";

const terminalManager = new TerminalManager();

const throttleTimeout = 5000; // 5 seconds
const maxSize = 1024 * 1024; // 1 MB

const changesQueue = new Map();

export function initWs(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    const host = socket.handshake.headers.host;
    console.log(`host is ${host}`);
    const replId = host?.split(".")[0];

    if (!replId) {
      socket.disconnect();
      terminalManager.clear(socket.id);
      return;
    }

    socket.emit("loaded", {
      rootContent: await fetchDir("/workspace", ""),
    });

    initHandlers(socket, replId);
  });
}

function initHandlers(socket: Socket, replId: string) {
  socket.on("disconnect", async () => {
    console.log("user disconnected");
    await flushChangesToS3(replId);
  });

  socket.on("fetchDir", async (dir: string, callback) => {
    const dirPath = `/workspace/${dir}`;
    const contents = await fetchDir(dirPath, dir);
    callback(contents);
  });

  socket.on(
    "fetchContent",
    async ({ path: filePath }: { path: string }, callback) => {
      const fullPath = `/workspace/${filePath}`;
      const data = await fetchFileContent(fullPath);
      callback(data);
    },
  );

  socket.on(
    "updateContent",
    async ({ path: filePath, content }: { path: string; content: string }) => {
      if (content.length > maxSize) {
        console.error("Content size exceeds the maximum limit");
        return;
      }

      const fullPath = `/workspace/${filePath}`;
      await saveFile(fullPath, content);

      // Queue the change for throttling
      if (!changesQueue.has(replId)) {
        changesQueue.set(replId, new Map());
      }
      const userQueue = changesQueue.get(replId);
      userQueue.set(filePath, content);

      // Throttle the update to S3
      setTimeout(async () => {
        if (userQueue.has(filePath)) {
          const contentToSave = userQueue.get(filePath);
          await saveToS3(`code/${replId}`, filePath, contentToSave);
          userQueue.delete(filePath);
        }
      }, throttleTimeout);
    },
  );

  socket.on("requestTerminal", async () => {
    terminalManager.createPty(socket.id, replId, (data, id) => {
      socket.emit("terminal", {
        data: Buffer.from(data, "utf-8"),
      });
    });
  });

  socket.on(
    "terminalData",
    async ({ data }: { data: string; terminalId: number }) => {
      terminalManager.write(socket.id, data);
    },
  );
}

async function flushChangesToS3(replId: string) {
  if (!changesQueue.has(replId)) return;

  const userQueue = changesQueue.get(replId);
  for (const [filePath, content] of userQueue.entries()) {
    await saveToS3(`code/${replId}`, filePath, content);
  }
  changesQueue.delete(replId);
}
