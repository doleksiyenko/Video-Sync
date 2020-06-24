import React, { useEffect } from "react";

const YTPlayer = () => {
    useEffect(() => {
        console.log("load iframe");
    });

    return <div id="player"></div>;
};

export default YTPlayer;
