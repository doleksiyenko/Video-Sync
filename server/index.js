const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const { addRoom, getRoom, removeRoom } = require("./rooms");

const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
    res.send(`Express loaded on port ${port}`);
});

let user;
let userRoom;
// socket.io
io.on("connection", (socket) => {
    // when the user sends a join request to the room
    socket.on("join", (name, room) => {
        // add a user to the room
        user = addUser(name, room, socket.id);
        console.log(`${user.name} has connected to ${user.room}.`);
        // emit a message to the room that the user has joined. Show this in the chat window.
        socket.emit(
            "message",
            `You have joined the room "${user.room}" with the name "${user.name}".`
        );
        socket.broadcast
            .to(user.room)
            .emit("message", `"${user.name}" has joined the session!`);

        // if the room doesn't exist yet, create the room
        if (!getRoom(user.room)) {
            addRoom(user.room);
        }

        userRoom = getRoom(user.room);
        socket.emit("changeVideoLink", userRoom.playingVideo);
        socket.emit("seekVid", userRoom.videoPosition);

        socket.join(user.room);
    });

    socket.on("sendMessage", (message) => {
        socket.emit("message", `You: ${message}`);
        socket.broadcast
            .to(user.room)
            .emit("message", `${user.name}: ${message}`);
    });

    socket.on("changeVideo", (vidId) => {
        if (user) {
            console.log(`Received ${vidId}.`);
            // change the video
            socket.emit("changeVideoLink", vidId);
            socket.broadcast.to(user.room).emit("changeVideoLink", vidId);
            userRoom.playingVideo = vidId;
        }
    });

    socket.on("changeVideoState", (state) => {
        socket.broadcast.to(user.room).emit("sendVideoState", state);
    });

    socket.on("updateLocation", (location) => {
        userRoom.videoPosition = location;
    });
    socket.on("seekRequest", (location) => {
        socket.emit("seekVid", location);
        socket.broadcast.to(user.room).emit("seekVid", location);
        userRoom.videoPosition = location;
    });

    socket.on("disconnect", () => {
        // if the server has been reset and users were connected, the server will crash because user will
        // will be undefined.
        if (user) {
            removeUser(socket.id);
            // when the last user disconnects from a room, delete the room from "rooms" list
            // so that the preferences of the room are reset.
            const users = getUsersInRoom(user.room);
            if (users.length === 0) {
                removeRoom(user.room);
            }
            // emit to other users that this socket has disconnected
            console.log(`${user.name} has disconnected from ${user.room}`);
            socket.broadcast
                .to(user.room)
                .emit("message", `"${user.name}" has left the session!`);
        }
    });
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
