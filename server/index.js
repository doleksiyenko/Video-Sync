const express = require("express");
const io = require("socket.io");

const app = express();
const http = require("http").createServer(app);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send(`Express loaded on port ${port}`);
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
