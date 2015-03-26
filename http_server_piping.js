'use strict';
var spawn = require('child_process').spawn;
require('http').createServer(function(req, res) {
	//child process (tail the file)
	var child = spawn('tail', ['-f', '/var/log/system.log']);
	//piping out the process into the response body
	child.stdout.pipe(res);
	res.on('end', function() {
		//when the browser is closed, kill the child process
		child.kill();
	});
}).listen(4000);