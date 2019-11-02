#!/usr/bin/env node
var dgram = require('dgram');

// based on http://www.bford.info/pub/net/p2pnat/index.html

const express = require('express')
const WebSocket = require('ws')
const http = require('http')

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(server_port, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
// const server = express()

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/port', (req, res) => res.send(server_port+''))
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port, server_host);
});

// var socket = dgram.createSocket('udp4');
// socket.bind(server_port, server_host);

// var publicEndpointA = null;
// var publicEndpointB = null;

// socket.on('listening', function () {
//     console.log('UDP Server listening on ' + socket.address().address + ":" + socket.address().port);
// });

// socket.on('message', function (message, remote) {
//     console.log(remote.address + ':' + remote.port +' - ' + message);

//     if(message == 'A') {
//     	publicEndpointA = {
//     		name: 'A',
//     		address: remote.address,
//     		port: remote.port
//     	}
//     }

//     if(message == 'B') {
//     	publicEndpointB = {
//     		name: 'B',
//     		address: remote.address,
//     		port: remote.port
//     	}
//     }

//     sendPublicDataToClients();
// });


// function sendPublicDataToClients () {
//     console.log(publicEndpointA, publicEndpointB);
// 	if(publicEndpointA && publicEndpointB) {

// 		var messageForA = new Buffer(JSON.stringify(publicEndpointB));
// 		socket.send(messageForA, 0, messageForA.length, publicEndpointA.port, publicEndpointA.address, function (err, nrOfBytesSent) {
// 			if(err) return console.log(err);
// 			console.log('> public endpoint of B sent to A');
// 		});

// 		var messageForB = new Buffer(JSON.stringify(publicEndpointA));
// 		socket.send(messageForB, 0, messageForB.length, publicEndpointB.port, publicEndpointB.address, function (err, nrOfBytesSent) {
// 			if(err) return console.log(err);
// 			console.log('> public endpoint of A sent to B');
// 		});

// 	}
// }







