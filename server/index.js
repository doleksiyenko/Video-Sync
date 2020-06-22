const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
    res.send(`Express loaded on port ${port}`);
});

// socket.io

io.on("connection", (socket) => {
    console.log("A user has connected.");
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
