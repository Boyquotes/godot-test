#!/usr/bin/env node
var dgram = require('dgram');

// based on http://www.bford.info/pub/net/p2pnat/index.html

const express = require('express')
const server = express()
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.get('/', (req, res) => res.send('Hello World!'))
server.get('/port', (req, res) => res.send(server_port+''))
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port, server_host);
});

var socket = dgram.createSocket('udp4');
socket.bind(33333, server_host);

var publicEndpointA = null;
var publicEndpointB = null;

socket.on('listening', function () {
    console.log('UDP Server listening on ' + socket.address().address + ":" + socket.address().port);
});

socket.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);

    if(message == 'A') {
    	publicEndpointA = {
    		name: 'A',
    		address: remote.address,
    		port: remote.port
    	}
    }

    if(message == 'B') {
    	publicEndpointB = {
    		name: 'B',
    		address: remote.address,
    		port: remote.port
    	}
    }

    sendPublicDataToClients();
});


function sendPublicDataToClients () {
    console.log(publicEndpointA, publicEndpointB);
	if(publicEndpointA && publicEndpointB) {

		var messageForA = new Buffer(JSON.stringify(publicEndpointB));
		socket.send(messageForA, 0, messageForA.length, publicEndpointA.port, publicEndpointA.address, function (err, nrOfBytesSent) {
			if(err) return console.log(err);
			console.log('> public endpoint of B sent to A');
		});

		var messageForB = new Buffer(JSON.stringify(publicEndpointA));
		socket.send(messageForB, 0, messageForB.length, publicEndpointB.port, publicEndpointB.address, function (err, nrOfBytesSent) {
			if(err) return console.log(err);
			console.log('> public endpoint of A sent to B');
		});

	}
}







