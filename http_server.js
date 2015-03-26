'use strict';
//obtain the http module
var http = require('http');
var server = http.createServer();

//This is emitted when a new client connects
server.on('request', function(req, res) {
	//This is a code that indicates the request succeeded
	res.writeHead(200, {'Content-Type': 'text/plain', 'Cache-Control': 'max-age=3600'});
	//You can see this on the browser
	res.write('Hello World\n');
	res.end();
	//The two lines above can be following a line
	//res.end('Hello World');
});
server.listen(4000);

/*
//Example of 'req.headers'
var util = require('util'); require('http').createServer(function(req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end(util.inspect(req.headers)); }).listen(4000);
*/
