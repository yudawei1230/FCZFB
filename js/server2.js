var http = require('http');
var url = require('url');
var querystring = require('querystring');
http.createServer( function (request, response) {  
	console.log(request.url);
	response.write('hi too');
	response.end();
}).listen(7071);