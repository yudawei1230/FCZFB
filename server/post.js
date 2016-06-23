!function(){
	var querystring = require('querystring')
	var write = require('./write.js')
	var read = require('./read.js')
	this.orderSubmit = function(req,res){
		write.submit(req,res);
	};
	this.searchOrderByPhone = function(req,res){
		read.readOrderByPhone(req,res);
	};
	//console.log(this);
	module.exports = this;
}()