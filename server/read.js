!function(){
	var fs = require('fs');
	var eventproxy = require('eventproxy');
	this.readOrderByPhone = function(req,res){
        var postData='';
        var callbackData = {list:[]};
        req.setEncoding("utf-8");
        req.addListener("data", function(data) {
            postData += data;
        });
        req.addListener('end',function(){
        	req.body = JSON.parse(postData);
			fs.readFile('./orderData.js',function(err,data){
				if(err){
					throw err;
					res.writeHead(404, {'Content-Type': 'application/json'});
					res.end();
				}
				else if(data=='')
				{
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.write(JSON.stringify({"E0021":"NOT_FOUND"}));
					res.end();
				}
				else{
					JSON.parse('['+data+']').forEach(function(item,index){
						if(item.username ==req.body.username){
							callbackData.list.push(item);
						}
					});
					this.searchById(callbackData,req,res);
				}
			});
        });
	}
	this.searchById = function(callbackData,req,res){
		var proxy = new eventproxy();
		var businessEntrust ={};
		var schedule = {};
		var ok = 0;
		var resWrite = function(){
			if(ok++!=1)
				return;
			console.log(businessEntrust);
			callbackData.list.forEach(function(item,index){
				item.businessEntrust = businessEntrust['id'+item.uuid];
				item.schedule = schedule['id'+item.uuid];
			});
			callbackData.S0019 = 'ORDER_SUCCESS';
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(JSON.stringify(callbackData));
			res.end();
		}
		callbackData.list.forEach(function(item,index){
			businessEntrust['id'+item.uuid] = [];
			schedule['id'+item.uuid] = [];
			fs.readFile('./orderType.js',function(err,data){
				if(err){
					throw err;
					res.writeHead(404, {'Content-Type': 'application/json'});
					res.end();
				}
				else{
					JSON.parse('['+data+']').forEach(function(items,indexs){
						if(item.uuid == items.uuid){
							businessEntrust['id'+item.uuid].push(items.type);
						}
					});
					if(index == callbackData.list.length-1){
						resWrite();
					}
				}
			});
			fs.readFile('./orderSchedule.js',function(err,data){
				if(err){
					throw err;
					res.writeHead(404, {'Content-Type': 'application/json'});
					res.end();
				}
				else{
					JSON.parse('['+data+']').forEach(function(items,indexs){
						if(item.uuid == items.uuid)
							schedule['id'+item.uuid].push(items);
					});
					if(index == callbackData.list.length-1){
						resWrite();
					}
				}
			})
		});
	}
	module.exports = this;
}()
