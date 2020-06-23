import React from "react";

const Input = ({ inputMessage, setInputMessage }) => {
    return (
        <div>
            <form>
                <input
                    value={inputMessage}
                    placeholder="Enter A Message"
                    onChange={(e) => setInputMessage(e.target.value)}
                    onSubmit={(e) => e.preventDefault()}
                ></input>
            </form>
        </div>
    );
};

export default Input;
