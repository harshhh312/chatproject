import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  if (!data.chatId || data.chatId === "null") {
    return (
      <div className="chat">
        <div className="chat-welcome">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="#6366f1"/>
            <path d="M7 9H17V11H7V9ZM7 12H14V14H7V12ZM7 6H17V8H7V6Z" fill="#6366f1"/>
          </svg>
          <h2>Welcome to ChatBox</h2>
          <p>Select a conversation from the sidebar to start messaging, or search for new friends to connect with.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="topbar">
        <img src={data.user?.photoURL} alt="" />
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
