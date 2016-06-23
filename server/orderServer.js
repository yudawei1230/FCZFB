var http = require('http')
var url = require('url')
var file = require('./file.js')
var post = require('./post.js')
var port = 80;
http.createServer(function(req,res){
	if(req.url.indexOf('.')>-1)
		file.file(req,res,req.url,req.url.split('.')[req.url.split('.').length-1])
	else if(req.url=='/')
		file.file(req,res,'/index.html','html');
	else if(req.url == '/api/xwdc/orderSubmit')
		post.orderSubmit(req,res);
	else if(req.url =='/api/xwdc/searchByUserName')
		post.searchOrderByPhone(req,res);
}).listen(port);
console.log('listen in port '+port+' !')