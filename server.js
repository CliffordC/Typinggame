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
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.use(express.static('src'));

const rooms = [
    {first:'first come', typers: 0},
    {second:'extras', typers: 0}
];

io.on('connection', (socket) => {

    if(rooms[0].typers<2){
        console.log('Currents typers in room #First Come: ',rooms[0].typers);
        socket.emit('join 1v1 request', true);
        //Adds user to the one v. one room.
        socket.join(rooms[0].first);
    }else{
        console.log('Currents typers in room #Extras: ',rooms[1].typers);
        socket.emit( 'join 1v1 request', false);
        socket.join(rooms[1].second);
    }

    socket.on('One on One challenger', (num)=> {
        console.log('a challenger has appeared');
        rooms[0].typers<2?rooms[0].typers+=num:rooms[1].typers +=num;
        socket.emit( 'start game',15,true );
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

const port = process.env.PORT || 4000; 
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
