import React from "react";
import ReactPlayer from "react-player";

import "./VideoPlayer";

const YTPlayer = (vidId) => {
    return (
        <div id="youtubePlayer">
            {ReactPlayer.canPlay(`https://www.youtube.com/watch?v=${vidId}`) ? (
                // if the video can be found, play that video
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${vidId}`}
                    width={640}
                    height={480}
                    controls={true}
                    style={{ margin: 20 }}
                ></ReactPlayer>
            ) : (
                // if the video cannot be found, just play a default video
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=ZTFTngOG2bg`}
                    width={640}
                    height={480}
                    controls={true}
                    style={{ margin: 20 }}
                ></ReactPlayer>
            )}
        </div>
    );
};

export default YTPlayer;
