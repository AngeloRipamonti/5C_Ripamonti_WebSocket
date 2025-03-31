const fs = require('fs');
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { Server } = require('socket.io');
const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), "config.json")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(process.cwd(), "public")));
app.use("/node_modules", express.static(path.join(process.cwd(), "node_modules")));

const server = http.createServer(app);
const io = new Server(server);
server.listen(config.port, () => {
    console.log("server running on port: " + config.port);
});
io.on('connection', (socket) => {
    console.log("socket connected: " + socket.id);
    io.emit("chat", "new client: " + socket.id);
    socket.on('message', (message) => {
        const response = socket.id + ': ' + message;
        console.log(response);
        io.emit("chat", response);
    });
});


