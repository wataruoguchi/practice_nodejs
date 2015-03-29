'use strict';
var path = require('path'), fs = require('fs');

require('http').createServer(function(req, res) {
	var file = path.normalize('.' + req.url);
	console.log('Trying to serve', file);

	function reportError(err) {
		console.log(err);
		res.writeHead(500);
		res.end('Internal Server Error');
	}

	path.exists(file, function(exists) {
		if (exists) {
			fs.stat(file, function(err, stat) {
				var rs;

				if (err) {
					//500 error
					return reportError(err);
				}

				if (stat.isDirectory()) {
					res.writeHead(403);
					res.end('Forbidden');
				} else {
					rs = fs.createReadStream(file);

					rs.on('error', reportError);

					res.writeHead(200);
					//piping the read stream into the response
					rs.pipe(res);
				}
			});
		} else {
			res.writeHead(404);
			res.end('Not found');
		}
	});
}).listen(4000);