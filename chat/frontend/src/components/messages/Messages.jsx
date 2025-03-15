import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const filteredMessages = messages.filter(
    (message) =>
      (message.senderId === selectedConversation.id ||
        message.senderId === authUser.id) &&
      (message.receiverId === selectedConversation.id ||
        message.receiverId === authUser.id),
  );

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        filteredMessages.length > 0 &&
        filteredMessages.map((message) => (
          <div key={message.id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
