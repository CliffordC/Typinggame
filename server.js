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

app.use(express.static('src'));

var currentUsers = 0;
io.on('connection', (socket) => {
    currentUsers++;
    console.log('A user connected. Number of users is now: ', currentUsers);

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });

const port = process.env.PORT || 4000; //Haven't bothered creating a environment variable for the port.
server.listen(port, () => {
  console.log('server running at http://localhost:4000');
});
