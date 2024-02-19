/*
 * Author: Clifford Chirwa
 * This file controls the servers interactions between two players of the typing game.
 * This will mainly utilize some of the power that comes with node.js! Exciting.
 */

/*
 * Using the common js syntax to feel like real old school node js developer
 *
 */
const express = require('express');
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000,() => {
    console.log('server is running on port 4000');
});
