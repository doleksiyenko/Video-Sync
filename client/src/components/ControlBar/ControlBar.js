import React from "react";
import Button from "react-bootstrap/Button";
import { PlayFill, PauseFill } from "react-bootstrap-icons";
import "./ControlBar.css";

const ControlBar = ({
    videoLength,
    videoPlaying,
    setVideoPlaying,
    videoProgress,
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
                class="custom-range"
                min={0}
                max={videoLength}
                value={videoProgress}
                id="customRange1"
            ></input>
        </div>
    );
};

export default ControlBar;
