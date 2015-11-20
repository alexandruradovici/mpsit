//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');

var server = http.createServer (function (request, response)
{
  response.write ('Hello, this is server speaking');
  response.end ();
});

server.listen (process.env.PORT);

