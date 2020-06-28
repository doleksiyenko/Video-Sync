import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import "./VideoPlayer.css";

// custom hook to use after initial render
const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
};

const YTPlayer = ({
    vidId,
    videoPlaying,
    sendVideoStatus,
    setVideoLength,
    setVideoProgress,
    seek,
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
        console.log(playerRef);
        setVideoLength(playerRef.current.getDuration());
    };

    useDidMountEffect(() => {
        playerRef.current.seekTo(seek, "seconds");
    }, [seek]);

    return (
        <div id="videoPlayer">
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
        </div>
    );
};

export default YTPlayer;
