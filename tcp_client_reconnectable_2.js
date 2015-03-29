'use strict';
var net = require('net'),
port = 4001,
conn;

var retryInterval = 3000, retriedTimes = 0, maxRetries = 10;

process.stdin.resume();

(function connect() {
	//Prevent too much reconnecting. It tries to connect every 3 sec. If it's failed 10 times it gives up to connect to server.
	function reconnect() {
		if (retriedTimes >= maxRetries) {
			throw new Error('Max retries have been exceeded, I give up.');
		}
		retriedTimes++;
		setTimeout(connect, retryInterval);
	}
	conn = net.createConnection(port);

	conn.on('connect', function() {
		retriedTimes = 0;
		console.log('Connected to server');
	});

	conn.on('error', function(err) {
		console.log('Error in connection:', err);
	});

	conn.on('close', function() {
		console.log('connection got closed, will try to reconnect');
		reconnect();
	});

	//process.stdin.pipe() ends the conn as soon as the process.stdin ends, which means that the conn will close after the process.stdin is closed.
	//To prevent this, add 'end' option.
	process.stdin.pipe(conn, {end: false});
}());