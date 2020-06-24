import React, { useEffect, useState } from "react";

import "./VideoSync.css";
import Input from "../Input/Input";

//modules
import io from "socket.io-client";
import queryString from "query-string";

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
        // set the messages here
        socket.on("message", (message) => {
            setMessages([...messages, message]);
            console.log(message);
        });
    }, [messages]);

    const sendMessage = (e) => {
        if (e.target.value.trim() !== "") {
            socket.emit("sendMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div id="sync-body">
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
