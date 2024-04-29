const express = require("express");
const app = express();
require("dotenv/config");
const path = require('path');
const http = require('http');
const server = http.createServer(app); // Create HTTP server with Express app
const { Server } = require("socket.io"); // Import Server class from socket.io
const { Socket } = require("dgram");
// const { Socket } = require("dgram");
const io = new Server(server); // Pass the HTTP server to Socket.IO Server

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });

    // Handle chat message
    socket.on('chatmessage', (payload) => {
        console.log("hello", payload);
        io.emit('serverevent', payload);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server running on port", port);
});
