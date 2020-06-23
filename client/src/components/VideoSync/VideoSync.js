import React, { useEffect, useState } from "react";

import "./VideoSync.css";
import Input from "../Input/Input";

//modules
import io from "socket.io-client";
import queryString from "query-string";

const VideoSync = ({ location }) => {
    const serverLocation = "localhost:5000";
    let [messages, setMessages] = useState([]);
    let [inputMessage, setInputMessage] = useState("");

    let socket;

    useEffect(() => {
        let user = queryString.parse(location.search);
        // once the params have been retrieved, set the document title to the room name
        document.title = `Video Sync - Room ${user.room}`;
        socket = io(serverLocation);
        socket.emit("join", user.name, user.room);

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [location.search, serverLocation]);

    useEffect(
        () =>
            // set the messages here
            socket.on("message", (message) => {
                setMessages([...messages, message]);
            }),
        [messages]
    );

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    };

    return (
        <div>
            <h1>Video Sync</h1>
            <Input
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
            ></Input>
        </div>
    );
};

export default VideoSync;

// main socket.io logic in here
