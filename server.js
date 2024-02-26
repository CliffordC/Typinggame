/*
 * Author: Clifford Chirwa
 * This file controls the servers interactions between two players of the typing game.
 * This will mainly utilize some of the power that comes with node.js! Exciting.
 */

/*
 * Using the common js syntax to feel like real old school node js developer.
 */
import express from 'express';
import {createServer} from 'node:http';
import { join } from 'node:path'
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.use(express.static('src'));

const rooms = [
    {first:'first come', typers: 0,t1:{id:'f',socketId:'x',time:0},t2:{id:'f',time:0}},
    {second:'extras', typers: 0}
];

io.on('connection', (socket) => {

    if(rooms[0].typers<2){
        socket.emit('join 1v1 request', true);
        //Adds user to the one v. one room.
        if(rooms[0].t1.id.length===1){
            rooms[0].t1.socketId=socket.id;
            rooms[0].t1.id='Reggie';  
            console.log(rooms[0].t1.id, ' -> typer 1 Nickname');
        }else{
            rooms[0].t2.socketId=socket.id;
            rooms[0].t2.id='Rocky';
            console.log(rooms[0].t2.id, ' -> typer 2 Nickname');
        }
        socket.join(rooms[0].first);
        rooms[0].typers++;
        console.log('Currents typers in room #First Come: ',rooms[0].typers);
    }else{
        socket.emit( 'join 1v1 request', false);
        socket.join(rooms[1].second);
        rooms[1].typers++;
        console.log('Currents typers in room #Extras: ',rooms[1].typers);
    }

    //returns winner of one v one session.
    const getWinner = ()=>{
        return (rooms[0].t1.time>rooms[0].t2.time)?rooms[0].t2.id:rooms[0].t1.id
    };

    socket.on('One on One challenger', (num)=> {
        console.log('a challenger has appeared');
        if(rooms[0].typers<2){
            rooms[0].typers+=num;
        }else{
            rooms[1].typers+=num;
        }

        if(rooms[0].typers===2){
            socket.to('first come').emit( 'start game',15);
        }
    });

    socket.on('send time!', async (time)=> {
        //TODO: logic for comparing times from clients and sharing winner with clients
        if(socket.id===rooms[0].t1.socketId){
            rooms[0].t1.time = time ;
        }
        if(socket.id===rooms[0].t2.socketId){
            rooms[0].t2.time = time ;
        }
        if(rooms[0].t1.time>0&&rooms[0].t2.time>0){
            let winnerInfo ={
                 winner:getWinner(),
            }
            socket.emit('received winner!',winnerInfo.winner);
        }
       
    });
    
    socket.on('disconnect', () => {
        if(Object.keys(rooms[0].t1).includes())
        console.log('user disconnected: ',socket.id);
      });
});

const port = process.env.PORT || 4000; 
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
