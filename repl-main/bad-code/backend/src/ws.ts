import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { fetchS3Folder, saveToS3 } from "./aws";
import path from "path";
import { fetchDir, fetchFileContent, saveFile, createFile } from "./fs";
import { TerminalManager } from "./pty";
import chokidar from "chokidar";

const terminalManager = new TerminalManager();

export function initWs(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    const replId = socket.handshake.query.roomId as string;

    if (!replId) {
      socket.disconnect();
      terminalManager.clear(socket.id);
      return;
    }

    const projectPath = path.join(__dirname, `../tmp/${replId}`);
    console.log("projectPath:", projectPath);

    try {
      await fetchS3Folder(`code/${replId}`, projectPath);

      // Initialize file watcher after fetching the initial project
      const rootContent = await fetchDir(projectPath, "");
      socket.emit("loaded", { rootContent });

      const watcher = chokidar.watch(projectPath, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
      });

      watcher.on("all", (event, filePath) => {
        console.log(`File ${event}d: ${filePath}`);
        socket.emit("file:changed", { type: event, path: filePath });
      });

      socket.on("disconnect", () => {
        watcher.close(); // Close the watcher when the client disconnects
        console.log("user disconnected");
      });

      initHandlers(socket, replId);
    } catch (error) {
      console.error("Error initializing the project:", error);
      socket.disconnect();
    }
  });
}

function initHandlers(socket: Socket, replId: string) {
  socket.on("fetchDir", async (dir: string, callback) => {
    try {
      const dirPath = path.join(__dirname, `../tmp/${replId}/${dir}`);
      const contents = await fetchDir(dirPath, dir);
      callback(contents);
    } catch (error) {
      console.error("Error fetching directory:", error);
      callback({ error: "Error fetching directory" });
    }
  });

  socket.on(
    "fetchContent",
    async ({ path: filePath }: { path: string }, callback) => {
      try {
        const fullPath = path.join(__dirname, `../tmp/${replId}/${filePath}`);
        const data = await fetchFileContent(fullPath);
        callback(data);
      } catch (error) {
        console.error("Error fetching file content:", error);
        callback({ error: "Error fetching file content" });
      }
    },
  );

  socket.on(
    "updateContent",
    async ({ path: filePath, content }: { path: string; content: string }) => {
      try {
        const fullPath = path.join(__dirname, `../tmp/${replId}/${filePath}`);
        await saveFile(fullPath, content);
        await saveToS3(`code/${replId}`, filePath, content);
        socket.broadcast.emit("file:changed", {
          type: "update",
          path: filePath,
        });
      } catch (error) {
        console.error("Error updating file content:", error);
      }
    },
  );

  socket.on(
    "createFile",
    //TODO: this is not being called in front end so no new files created in being stored in the cloudflare
    async ({ path: filePath, content }: { path: string; content: string }) => {
      try {
        console.log("new file has been created");
        const fullPath = path.join(__dirname, `../tmp/${replId}/${filePath}`);
        await createFile(fullPath, content);
        await saveToS3(`code/${replId}`, filePath, content);
        socket.broadcast.emit("file:changed", {
          type: "create",
          path: filePath,
        });
      } catch (error) {
        console.error("Error creating file:", error);
      }
    },
  );

  socket.on("requestTerminal", async () => {
    terminalManager.createPty(socket.id, replId, (data, id) => {
      socket.emit("terminal", { data: Buffer.from(data, "utf-8") });
    });
  });

  socket.on(
    "terminalData",
    async ({ data }: { data: string; terminalId: number }) => {
      terminalManager.write(socket.id, data);
    },
  );
}
