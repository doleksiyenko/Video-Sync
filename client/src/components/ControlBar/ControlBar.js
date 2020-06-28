import React from "react";
import Button from "react-bootstrap/Button";
import { PlayFill, PauseFill } from "react-bootstrap-icons";
import "./ControlBar.css";

const ControlBar = ({
    videoLength,
    videoPlaying,
    setVideoPlaying,
    videoProgress,
    emitSeekVideo,
}) => {
    const switchStatus = () => {
        setVideoPlaying(!videoPlaying);
    };

    return (
        <div id="controlBar">
            {/* set the range from 0 to video length */}
            <Button id="playpause" onClick={() => switchStatus()}>
                {videoPlaying === false ? (
                    <PlayFill color="white"></PlayFill>
                ) : (
                    <PauseFill color="white"></PauseFill>
                )}
            </Button>
            <input
                type="range"
                className="custom-range"
                min={0}
                max={videoLength}
                value={videoProgress}
                onChange={(e) => emitSeekVideo(e.target.value)}
                id="customRange1"
            ></input>
        </div>
    );
};

export default ControlBar;
