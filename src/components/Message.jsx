import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwner = message.senderId === currentUser.uid;

  return (
    <div
      ref={ref}
      className={`Message ${isOwner ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img
          className="userphoto"
          src={isOwner ? currentUser.photoURL : data.user.photoURL}
          alt="User Profile"
        />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img className="photoshare" src={message.img} alt="Shared Content" />}
      </div>
    </div>
  );
};

export default Message;