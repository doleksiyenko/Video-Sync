import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

import "./VideoPlayer.css";

const YTPlayer = ({ vidId, videoPlaying, sendVideoStatus }) => {
    // const playerRef = useRef(null);

    const playable = (link) => {
        if (ReactPlayer.canPlay(link)) {
            return `https://www.youtube.com/watch?v=${vidId}`;
        } else {
            return `https://www.youtube.com/watch?v=ZTFTngOG2bg`;
        }
    };

    return (
        <div id="videoPlayer">
            <ReactPlayer
                // ref={}
                url={playable(`https://www.youtube.com/watch?v=${vidId}`)}
                playing={videoPlaying}
                width="100%"
                height="100%"
                style={{ margin: 20 }}
                onPlay={() => sendVideoStatus(true)}
                onPause={() => sendVideoStatus(false)}
            ></ReactPlayer>
        </div>
    );
};

export default YTPlayer;
