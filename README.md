# Practice Node.js
This is personal Node.js practice repository.
I'm teaching Node.js to myself with following a book below.

[Professional Node.js: Building Javascript Based Scalable Software](http://www.amazon.ca/Professional-Node-js-Building-Javascript-Scalable/dp/1118185463)

## First repository
First repository is following [The Node Beginner Book](http://www.nodebeginner.org/)

## Updates
* Creating TCP Servers
  * tcp_server.js is a lifecycle example of a TCP Server
  * tcp_server_echo.js is using the socket object, and testing either piping into/out the socket.
  * tcp_server_chat.js is a simple TCP chat server. Broadcast messages by a socket to other sockets.

* Creating HTTP Servers
  * http_server.js is a simple HTTP server which writes header information.
  * http_server_movie.js is a HTTP server which pipes ReadStream(movie) into the response. The ReadStream starts playing immediately even though it's not fully loaded.
  * http_server_piping.js is a HTTP server which pipes the output of a child process into the response.
  * http_server_staticFile.js is a simple HTTP server which serves static files.


## References
* [Writing Fast, Memory-Efficient JavaScript](http://www.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/)
* [GETTING UP AND RUNNING WITH NODE.JS, EXPRESS, JADE, AND MONGODB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/)
* [Taking Advantage of Multi-Processor Environments in Node.js](http://blog.carbonfive.com/2014/02/28/taking-advantage-of-multi-processor-environments-in-node-js/)
* [Know a Delay: Nagle’s Algorithm and You.](http://www.boundary.com/blog/2012/05/know-a-delay-nagles-algorithm-and-you/)