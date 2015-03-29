'use strict';
var net = require('net'), port = 4001, quitting = false, conn,
retryTimeout = 3000, retriedTimes = 0, maxRetries = 10;

process.stdin.resume();

process.stdin.on('data', function(data) {
	if(data.toString().trim().toLowerCase() === 'quit') {
		quitting = true;
		console.log('quitting...');
		conn.end();
		process.stdin.pause();
	} else {
		conn.write(data);
	}
});

(function connect() {
	function reconnect() {
		if(retriedTimes >= maxRetries) {
			throw new Error('Max retries have been exceeded, I give up.');
		}
		retriedTimes++;
		setTimeout(connect, retryTimeout);
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
		if (!quitting) {
			console.log('Connection got closed, will try to reconnect');
			reconnect();			
		}
	});
	/*
	Printing server messages.
	In order to prevent closing standard output stream after the connection is closed, it has an option 'end'
	*/
	conn.pipe(process.stdout, {end: false});
}());