'use strict';
//TCP chat server
var net = require('net');

var server = net.createServer();

var sockets = [];

server.on('connection', function(socket) {
	console.log('Got a new connection');

	//Because you have to broadcast the user data to everyone, store all the connections in a central place.
	sockets.push(socket);

	//Every time the server get  new connection, you need to listen for the incoming data by binding to the data event.
	socket.on('data', function(data) {
		console.log('got data:', data.toString());

		if(data.toString().trim().toLowerCase() == 'quit') {
			//Close connection
			return socket.end();
		}

		//Broadcasting data
		sockets.forEach(function(otherSocket) {
			if(otherSocket !== socket) {
				otherSocket.write(data);
			}
		});
	});

	//Removing closed connections
	socket.on('close', function() {
		console.log('Connection closed');
		var index = sockets.indexOf(socket);
		sockets.splice(index, 1);
	});

	socket.on('end', function() {
		//When the socket is disconnected, 'end' event runs first, then 'close' event runs.
		console.log("See the difference between 'close' event and 'end' event.\n");
	});
});

server.on('error', function(err) {
	console.log('Server errror:', err.message);
});

server.on('close', function() {
	console.log('Server closed');
});

//Binding the server to port 4001
server.listen(4001);