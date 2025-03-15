import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  console.log("socket", socket);
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      console.log("Received new message:", newMessage);
      console.log(newMessage);
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);

  socket?.on("newMessage", (newMessage) => {
    newMessage.shouldShake = true;
    console.log("Received new message:", newMessage);
  });
  useEffect(() => {
    console.log("new Message", messages);
  }, [messages]);
};
export default useListenMessages;
