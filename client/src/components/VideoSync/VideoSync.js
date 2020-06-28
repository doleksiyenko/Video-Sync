import React, { useEffect, useState } from "react";

import "./VideoSync.css";

//modules
import io from "socket.io-client";
import queryString from "query-string";
import ChatWindow from "../ChatWindow/ChatWindow";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import SearchBar from "../SearchBar/SearchBar";
import ControlBar from "../ControlBar/ControlBar";

let socket;

const VideoSync = ({ location }) => {
    const serverLocation = "localhost:5000";
    //general state
    let [room, setRoom] = useState("");
    // message field states
    let [messages, setMessages] = useState([]);
    let [inputMessage, setInputMessage] = useState("");
    // states for the video player
    let [vidId, setVidId] = useState("ZTFTngOG2bg");
    let [videoPlaying, setVideoPlaying] = useState(false);
    let [videoLength, setVideoLength] = useState(1);
    let [videoProgress, setVideoProgress] = useState(0);
    let [seek, setSeek] = useState(0);

    useEffect(() => {
        let user = queryString.parse(location.search);
        // once the params have been retrieved, set the document title to the room name
        document.title = `Video Sync - Room ${user.room}`;
        socket = io(serverLocation);
        socket.emit("join", user.name, user.room);

        setRoom(user.room);

        return () => {
            socket.emit("disconnect");
            socket.off();
            socket.close();
        };
    }, [location.search, serverLocation]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
            // this is to prevent multiple listeners forming for every single message change
            socket.off();
        });
    }, [messages]);

    useEffect(() => {
        socket.on("changeVideoLink", (vidLink) => {
            console.log(`Using ${vidLink}.`);
            setVidId(vidLink);
        });
    });

    useEffect(() => {
        socket.on("sendVideoState", (state) => {
            console.log(`Setting state to ${state}`);
            setVideoPlaying(state);
        });
    });

    useEffect(() => {
        socket.on("seekVid", (location) => {
            setSeek(location);
        });
    });

    const sendMessage = (e) => {
        if (e.target.value.trim() !== "") {
            socket.emit("sendMessage", e.target.value);
            setInputMessage("");
        }
    };

    const changeVideo = (e) => {
        socket.emit("changeVideo", e.target.value.trim());
        e.target.value = "";
    };

    const sendVideoStatus = (state) => {
        state ? setVideoPlaying(true) : setVideoPlaying(false);
        socket.emit("changeVideoState", state);
    };

    const emitSeekVideo = (location) => {
        socket.emit("seekRequest", location);
    };

    return (
        <div>
            <h1 style={{ marginLeft: 40, marginTop: 20 }}>
                Room <span style={{ color: "darkred" }}>{room}</span>
            </h1>
            <div id="sync-body">
                <div id="videoItem">
                    <SearchBar
                        setVidId={setVidId}
                        changeVideo={changeVideo}
                    ></SearchBar>
                    <VideoPlayer
                        vidId={vidId}
                        videoPlaying={videoPlaying}
                        sendVideoStatus={sendVideoStatus}
                        setVideoLength={setVideoLength}
                        setVideoProgress={setVideoProgress}
                        seek={seek}
                    ></VideoPlayer>
                    <ControlBar
                        videoPlaying={videoPlaying}
                        setVideoPlaying={setVideoPlaying}
                        videoLength={videoLength}
                        videoProgress={videoProgress}
                        emitSeekVideo={emitSeekVideo}
                    ></ControlBar>
                </div>
                <ChatWindow
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                    sendMessage={sendMessage}
                    messages={messages}
                ></ChatWindow>
            </div>
        </div>
    );
};

export default VideoSync;
