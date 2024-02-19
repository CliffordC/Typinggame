/*
 * Author: Clifford Chirwa
 * This file controls the servers interactions between two players of the typing game.
 * This will mainly utilize some of the power that comes with node.js! Exciting.
 */

/*
 * Using the common js syntax to feel like real old school node js developer.
 */
const express = require('express');
const { createServer } = require('http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use( express.static(__dirname + '/src'));

app.get('/', (req, res) => {
    console.log('sent index.html to the client.')
    res.sendFile(join(__dirname, 'index.html'));
});

app.get("/src/style.css", (req, res) => {
    console.log('sent css to the client.') 
    res.sendFile(join(__dirname, '/src/style.css'));
});

app.get("/src/script.js", (req, res) => {
    console.log('sent js to the client.')
    res.sendFile(join(__dirname, '/src/script.js'));
});
// io.on('connection', (socket) => {
//   socket.on('send name', (user) => {
//     io.emit('send name', user);
//   });

//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });

const port = process.env.PORT || 4000; //Haven't bothered creating a environment variable for the port.
server.listen(port, () => {
  console.log('server running at http://localhost:4000');
});
