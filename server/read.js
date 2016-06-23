!function(){
	var fs = require('fs')
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
				if(err)
					throw err;
				else{
					JSON.parse('['+data+']').forEach(function(item,index){
						if(item.username ==req.body.username)
							callbackData.list.push(item);
					});
					callbackData.S0019 = 'ORDER_SUCCESS';
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.write(JSON.stringify(callbackData));
					res.end();
				}
			})
        });
	}
	module.exports = this;
}()