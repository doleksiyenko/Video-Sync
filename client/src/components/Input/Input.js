import React from "react";

const Input = ({ inputMessage, setInputMessage, sendMessage }) => {
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
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
