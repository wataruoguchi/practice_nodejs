'use strict';
var writableStream = require('fs').createWriteStream('mysocketdump.txt');
var server = require('net').createServer(
	/*socket object is both a read and write stream
	it emmits data event when it gets a package of data
	also emits end when that conneciton is closed */

	function(socket){
		console.log('new connection');
		socket.setEncoding('utf8');
		socket.write("Hello! You can start typing. Type 'quit' to exit.\n");
		socket.on('data', function(data) {
			console.log('got:', data.toString());
			if(data.trim().toLowerCase() == 'quit') {
				//Piping into a socket
				var readableStream = require('fs').createReadStream('bye.txt');
				readableStream.on('end', function(){
					/*detect completion of pipe. by http://stackoverflow.com/questions/11447872/callback-to-handle-completion-of-pipe
					After complete writing a message from a readable stream, write the message into socket, then the socket connection ends. */
					socket.write('Bye bye!\n');
					return socket.end();
				}).pipe(socket);;
			}
			socket.write(data);
		});

		/*Because the socket object is a readable stream, you can control the flow by calling socket.pause(), socket.resume().
		Also you can pipe it into a writable stream. */
		//Piping out a socket
		socket.pipe(writableStream);

		socket.on('end', function() {
			console.log('Client connection ended');
		});
	}
).listen(4001);


/** Result
[Server side]
$ node tcp_server

[Client side]
$ telnet localhost 4001

[Client side]
Trying ::1...
telnet: connect to address ::1: Connection refused
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
Hello! You can start typing. Type 'quit' to exit.

[Server side]
new connection

[Client side]
> Hello from client side
Hello from client side

[Server side]
got: Hello from client side


[Client side]
> I got it
I got it

[Server side]
got: I got it


[Client side]
> quit
Bye bye!Connection closed by foreign host.

[Server side]
Client connection ended

(Just connection ended, the server is still running.)
**/