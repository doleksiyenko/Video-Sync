import React, { useRef } from "react";
import ReactPlayer from "react-player";

import "./VideoPlayer.css";

const YTPlayer = ({
    vidId,
    videoPlaying,
    sendVideoStatus,
    setVideoLength,
    setVideoProgress,
}) => {
    const playerRef = useRef(null);

    const playable = (link) => {
        if (ReactPlayer.canPlay(link)) {
            return `https://www.youtube.com/watch?v=${vidId}`;
        } else {
            return `https://www.youtube.com/watch?v=ZTFTngOG2bg`;
        }
    };

    const duration = () => {
        setVideoLength(playerRef.current.getDuration());
    };

    return (
        <div id="videoPlayer">
            <ReactPlayer
                ref={playerRef}
                onStart={duration}
                url={playable(`https://www.youtube.com/watch?v=${vidId}`)}
                playing={videoPlaying}
                width="100%"
                height="100%"
                style={{ margin: 20 }}
                onPlay={() => sendVideoStatus(true)}
                onPause={() => sendVideoStatus(false)}
                onProgress={(progress) =>
                    setVideoProgress(progress.playedSeconds)
                }
            ></ReactPlayer>
        </div>
    );
};

export default YTPlayer;
