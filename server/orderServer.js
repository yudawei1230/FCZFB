var http = require('http')
var url = require('url')
var file = require('./file.js')
var post = require('./post.js')
var port = 80;
http.createServer(function(req,res){
	req.url = req.url.split('?')[0];
	if(req.url.indexOf('.')>-1)
		file.file(req,res,req.url,req.url.split('.')[req.url.split('.').length-1])
	else if(req.url=='/')
		file.file(req,res,'/index.html','html');
	else if(req.url == '/api/xwdc/orderSubmit')
		post.orderSubmit(req,res);
	else if(req.url =='/api/xwdc/searchByUserName')
		post.searchOrderByPhone(req,res);
	else if(req.url =='/statuschange')
		post.changeStatus(req,res);
	else if(req.url =='/api/xwdc/upload')
		post.upload(req,res);
	else
		res.end()
}).listen(port);
console.log('listen in port '+port+' !')