import React from "react";
import "./Message.css";

const Message = ({ message }) => {
  if (message === null) {
    return null;
  }
  const { text, msgClass } = message;
  return <div className={"message " + msgClass}>{text}</div>;
};

export default Message;
