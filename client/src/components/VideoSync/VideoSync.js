import React, { useEffect, useState } from "react";

import "./VideoSync.css";

//modules
import io from "socket.io-client";
import queryString from "query-string";

const VideoSync = () => {
    const serverLocation = "localhost:5000";

    let [messages, setMessages] = useState([]);

    useEffect(() => {
        let user = queryString.parse(window.location.search);
        // once the params have been retrieved, set the document title to the room name
        document.title = `Video Sync - Room ${user.room}`;

        const socket = io(serverLocation);

        socket.emit("join", user.name, user.room);

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [window.location.search, serverLocation]);

    useEffect(() => {
        // set the messages here
        // socket.on("message", (message) => {
        //     //
        // });
    }, [messages]);

    return <h1>Video Sync</h1>;
};

export default VideoSync;

// main socket.io logic in here
