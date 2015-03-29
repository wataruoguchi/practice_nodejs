'use strict';
var net = require('net'),
port = 4001,
conn = net.createConnection(port);

conn.on('connect', function() {
	console.log('connected to server');
});
conn.on('error', function(err) {
	console.log('Error in connection:', err);
});

/*
First of all, launch tcp_server_chat.js.
Secondly launch this client, then you will see it connects to server. ('connected to server')
Server says 'Got a new connection'.

I used to type 'telnet localhost 4001' when I connect to the TCP server.
*/