'use strict';
/* createServer() which you bind to TCP port 4001
This is also an event emitter, net.Server emmits the following events

listening : When the server is listening on the specified port and address.

connection : When a new connection is established.
The callback to this function will receive the corresponding socket object.
You can also bind to this event by passing a function to net.createServer().

close : When the server is closed, that is, it’s not bound to that port any more.

error : When an error occurs at the server level.
An error event happens, for instance, when you try to bind to an occupied port or to a port you don’t have permission to bind to.
*/
var server = require('net').createServer(),
port = 4001;

server.on('listening', function(){
	console.log('Server is listening on port', port);
});

server.on('connection', function(socket){
	console.log('Server has a new connection');
	socket.end();
	server.close();
});

server.on('close', function(){
	console.log('Server is now closed');
});

server.on('error', function(err) {
	console.log('Error occurred:', err.message);
});

server.listen(port);

/* While the server is running, connect to it by
$ telnet localhost 4001
OR
$ nc localhost 4001
*/
/** Result
[Server side]
$ node tcp_server

[Server side]
Server is listening on port 4001

[Client side]
$ telnet localhost 4001

[Client side]
Trying ::1...
telnet: connect to address ::1: Connection refused
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
Connection closed by foreign host.

[Server side]
Server has a new connection
Server is now closed

**/