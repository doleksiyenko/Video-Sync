const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
    res.send(`Express loaded on port ${port}`);
});

let currentRoomVideo = "";
let user;
// socket.io
io.on("connection", (socket) => {
    // when the user sends a join request to the room
    socket.on("join", (name, room) => {
        // add a user to the room
        user = addUser(name, room, socket.id);
        console.log(`${user.name} has connected to ${user.room}.`);
        console.log(user);
        // emit a message to the room that the user has joined. Show this in the chat window.
        socket.emit(
            "message",
            `You have joined the room "${user.room}" with the name "${user.name}".`
        );
        socket.broadcast
            .to(user.room)
            .emit("message", `"${user.name}" has joined the session!`);
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
        }
    });

    socket.on("changeVideoState", (state) => {
        socket.broadcast.to(user.room).emit("sendVideoState", state);
    });

    socket.on("disconnect", () => {
        // if the server has been reset and users were connected, the server will crash because user will
        // will be undefined.
        if (user) {
            removeUser(socket.id);
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
