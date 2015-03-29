'use strict';
var net = require('net'),
port = 4001,
conn;

/*
When a Node process starts, process.stdin is a stream prepared to accept user keyboard input.
This ReadStream will emit 'data' events, but only after you resume it; that stream is initialized in the paused state.
You can resume it by calling resume method on the stream.
*/
process.stdin.resume();

(function connect() {
	conn = net.createConnection(port);

	conn.on('connect', function() {
		console.log('connected to server');
	});

	conn.on('error', function(err) {
		console.log('Error in connection:', err);
	});

	conn.on('close', function() {
		console.log('Connection got closed, will try to reconnect');
		connect();
	});

	/*
	Printing server messages.
	In order to prevent closing standard output stream after the connection is closed, it has an option 'end'
	*/
	conn.pipe(process.stdout, {end: false});
	/*
	Every time process.stdin stream is flushed. The data is piped to the server through the conn writable stream.
	*/
	process.stdin.pipe(conn);
}());

/*
When the server stops, it prints below continuously:

Error in connection: { [Error: connect ECONNREFUSED]
  code: 'ECONNREFUSED',
  errno: 'ECONNREFUSED',
  syscall: 'connect' }
Connection got closed, will try to reconnect

Until the server launches again.
However, it is not recommended that you reconnect immediately after you get disconnected.
Doing so can create a kind of loop, flooding your network with connection requests.
You need to wait a bit, or retry just certain times then quit after a number of failed.
*/