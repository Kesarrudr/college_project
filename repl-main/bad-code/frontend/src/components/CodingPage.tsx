import { useEffect, useState, useRef } from "react";
import { Editor } from "./Editor";
import { File, RemoteFile, Type } from "./external/editor/utils/file-manager";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Output } from "./Output";
import { TerminalComponent as Terminal } from "./Terminal";
import { Socket, io } from "socket.io-client";
import { EXECUTION_ENGINE_URI } from "../config";
import { GoSidebarCollapse } from "react-icons/go";
import TopBar from "./external/editor/components/topbar.tsx";
import { diff_match_patch as DiffMatchPatch } from 'diff-match-patch';
import debounce from 'lodash/debounce';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Workspace = styled.div`
  display: flex;
  margin: 0;
  font-size: 16px;
  width: 100%;
`;

interface PanelProps {
  isCollapsed: boolean;
}

const LeftPanel = styled.div<PanelProps>`
  flex: ${({ isCollapsed }) => (isCollapsed ? "1" : "3")};
  width: ${({ isCollapsed }) => (isCollapsed ? "100%" : "60%")};
  transition: all 0.3s ease;
`;

const RightPanel = styled.div<PanelProps>`
  flex: ${({ isCollapsed }) => (isCollapsed ? "0" : "1")};
  width: ${({ isCollapsed }) => (isCollapsed ? "0%" : "40%")};
  transition: all 0.3s ease;
`;

function useSocket(replId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${EXECUTION_ENGINE_URI}?roomId=${replId}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [replId]);

  return socket;
}

export const CodingPage = () => {
  const [searchParams] = useSearchParams();
  const replId = searchParams.get("replId") ?? "";
  const [loaded, setLoaded] = useState(false);
  const socket = useSocket(replId);
  const [fileStructure, setFileStructure] = useState<RemoteFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [showOutput, setShowOutput] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [code, setCode] = useState('');
  const dmp = useRef(new DiffMatchPatch());
  const previousCode = useRef('');

  useEffect(() => {
    if (socket) {
      const handleLoaded = ({ rootContent }: { rootContent: RemoteFile[] }) => {
        setFileStructure(rootContent);
        setLoaded(true);
      };

      const handleFileChanged = () => {
        socket.emit("fetchDir", "", (contents: RemoteFile[]) => {
          setFileStructure(contents);
        });
      };

      const handleUpdateContent = ({ path, diffs }: { path: string; diffs: [number, string][] }) => {
        if (selectedFile?.path === path) {
          const patches = dmp.current.patch_make(previousCode.current, diffs);
          const [updatedCode] = dmp.current.patch_apply(patches, previousCode.current);
          setCode(updatedCode);
          previousCode.current = updatedCode;
        }
      };

      socket.on("file:changed", handleFileChanged);
      socket.on("loaded", handleLoaded);
      socket.on("updateContent", handleUpdateContent);

      return () => {
        socket.off("loaded", handleLoaded);
        socket.off("file:changed", handleFileChanged);
        socket.off("updateContent", handleUpdateContent);
      };
    }
  }, [socket, selectedFile]);

  const handleEditorChange = debounce((newCode: string) => {
    if (selectedFile) {
      const diffs = dmp.current.diff_main(previousCode.current, newCode);
      if (diffs.length > 0) {
        dmp.current.diff_cleanupSemantic(diffs);
        socket?.emit("updateContent", { path: selectedFile.path, diffs });
        previousCode.current = newCode;
      }
    }
  }, 500);

  const onSelect = (file: File) => {
    if (file.type === Type.DIRECTORY) {
      socket?.emit("fetchDir", file.path, (data: RemoteFile[]) => {
        setFileStructure((prev) => {
          const allFiles = [...prev, ...data];
          return allFiles.filter(
            (file, index, self) =>
              index === self.findIndex((f) => f.path === file.path),
          );
        });
      });
    } else {
      socket?.emit("fetchContent", { path: file.path }, (data: string) => {
        file.content = data;
        setSelectedFile(file);
        setCode(data);
        previousCode.current = data;
      });
    }
  };

  if (!loaded) {
    return "Loading...";
  }

  const openNewTab = () => {
    window.open("http://localhost:3000", "_blank");
  };

  return (
    <Container>
      <TopBar />
      <ButtonContainer>
        <GoSidebarCollapse onClick={() => setIsCollapsed(!isCollapsed)} />
        <button onClick={() => setShowOutput(!showOutput)}>See output</button>
        <button onClick={openNewTab}>Open in new Tab</button>
      </ButtonContainer>
      <Workspace>
        <LeftPanel isCollapsed={isCollapsed}>
          <Editor
            height="100vh"
            language={selectedFile?.language || 'javascript'}
            value={code}
            theme="vs-dark"
            onChange={handleEditorChange}
            files={fileStructure}
            onSelect={onSelect}
            selectedFile={selectedFile}
            socket={socket as Socket}
          />
        </LeftPanel>
        <RightPanel isCollapsed={isCollapsed}>
          {showOutput && <Output />}
          <Terminal socket={socket as Socket} />
        </RightPanel>
      </Workspace>
    </Container>
  );
};

