import React from "react";
import "./Input.css";

const Input = ({ inputMessage, setInputMessage, sendMessage }) => {
    return (
        <div className="message-input">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    id="messageInput"
                    value={inputMessage}
                    placeholder="Enter A Message"
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            sendMessage(e);
                        }
                    }}
                ></input>
            </form>
        </div>
    );
};

export default Input;
