import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { PlayFill, PauseFill } from "react-bootstrap-icons";
import "./ControlBar.css";

const ControlBar = ({ videoLength }) => {
    let [status, setStatus] = useState(true);

    const switchIcon = () => {
        setStatus(!status);
    };

    return (
        <div id="controlBar">
            {/* set the range from 0 to video length */}
            <Button id="playpause" onClick={() => switchIcon()}>
                {status === true ? (
                    <PlayFill color="white"></PlayFill>
                ) : (
                    <PauseFill color="white"></PauseFill>
                )}
            </Button>
            <input type="range" class="custom-range" id="customRange1"></input>
        </div>
    );
};

export default ControlBar;
