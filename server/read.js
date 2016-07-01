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
		var resWrite = function(){
			callbackData.list.forEach(function(item,index){
				item.businessEntrust = businessEntrust['id'+item.uuid];
				item.schedule = schedule['id'+item.uuid];
				if(index == callbackData.length-1)
				{
					console.log(1);
				}
			});
		}
		callbackData.list.forEach(function(item,index){
			businessEntrust['id'+item.uuid] = [];
			schedule['id'+item.uuid] = [];
			try{
				JSON.parse('['+fs.readFileSync('./orderType.js','utf-8')+']').forEach(function(items,indexs){
					if(item.uuid == items.uuid){
						businessEntrust['id'+item.uuid].push(items.type);
					}
				});
				JSON.parse('['+fs.readFileSync('./orderSchedule.js','utf-8')+']').forEach(function(items,indexs){
					if(item.uuid == items.uuid)
						schedule['id'+item.uuid].push(items);
				});
				resWrite();
			}catch(e){
				throw e;
				res.writeHead(404, {'Content-Type': 'application/json'});
				res.end();
			}

		});
		callbackData.S0019 = 'ORDER_SUCCESS';
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify(callbackData));
		res.end();
	}
	this.getOrderById = function(src,id){
		var data={};	
		try{
			var order = JSON.parse('['+fs.readFileSync(src,'utf-8')+']');
			order.forEach(function(item,index){
				if(item.uuid == id)
				{
					data.index = index;
					data.order = order;
				}
			});
			return data;
		}catch(e){
			console.log(e);
		}	
	}
	this.readFile = function(src){
		try{
			return fs.readFileSync(src,'utf-8')
		}catch(e){
			console.log(e);
		}	
	}
	module.exports = this;
}()
