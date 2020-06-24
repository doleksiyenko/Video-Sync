import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./ChatWindow.css";
// components
import Input from "../Input/Input";
import Message from "../Message/Message";

const ChatWindow = ({
    messages,
    inputMessage,
    setInputMessage,
    sendMessage,
}) => {
    return (
        <div className="chat-box">
            <ScrollToBottom className="message-box">
                {messages.map((message, i) => (
                    <Message key={i} message={message}></Message>
                ))}
            </ScrollToBottom>
            <Input
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
            />
        </div>
    );
};

export default ChatWindow;
