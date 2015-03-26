'use strict';
var fs = require('fs');
require('http').createServer(function(req, res) {
	//With every request, you are writing the header response status and setting the content type header
	//so that the browser correctly ideintifies the type of stream you are delivering to it.
	res.writeHead(200, {'Content-Type': 'video/mp4'});
	var rs = fs.createReadStream('test.mp4');
	rs.pipe(res);
}).listen(4000);
//With some reason it works on Firefox(35.0.1), but not on Chrome(41.0.2272.104)