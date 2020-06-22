import React, { useEffect } from "react";

import "./VideoSync.css";

//modules
import io from "socket.io-client";
import queryString from "query-string";

const VideoSync = () => {
    const serverLocation = "localhost:5000";

    useEffect(() => {
        let user = queryString.parse(window.location.search);
        // once the params have been retrieved, set the document title to the room name
        document.title = `Video Sync - Room ${user.room}`;

        const socket = io(serverLocation);
        console.log(socket);
    }, [window.location.search, serverLocation]);
    return <h1>Video Sync</h1>;
};

export default VideoSync;

// main socket.io logic in here
