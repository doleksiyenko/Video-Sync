import React, { useEffect, useState } from "react";

import "./VideoSync.css";

//modules
import io from "socket.io-client";
import queryString from "query-string";
import ChatWindow from "../ChatWindow/ChatWindow";

let socket;

const VideoSync = ({ location }) => {
    const serverLocation = "localhost:5000";
    let [messages, setMessages] = useState([]);
    let [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
        let user = queryString.parse(location.search);
        // once the params have been retrieved, set the document title to the room name
        document.title = `Video Sync - Room ${user.room}`;
        socket = io(serverLocation);
        socket.emit("join", user.name, user.room);

        return () => {
            socket.emit("disconnect");
            socket.off();
            socket.close();
        };
    }, [location.search, serverLocation]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
            // this is to prevent multiple listeners forming for every single message change
            socket.off();
        });
    }, [messages]);

    const sendMessage = (e) => {
        if (e.target.value.trim() !== "") {
            socket.emit("sendMessage", e.target.value);
            setInputMessage("");
        }
    };

    return (
        <div id="sync-body">
            <h1 style={{ margin: 20 }}>Video Sync</h1>
            <ChatWindow
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                messages={messages}
            ></ChatWindow>
        </div>
    );
};

export default VideoSync;
