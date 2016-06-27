!function(){
	var fs = require('fs')

	this.validate = function(request,type){
         for(var i in dataName[type]){
            if(!request.body[i])
               return false;
            else if(request.body[i]=='')
               return false;
         }
         return true;
    }
    this.changestatus = function(req,res){
        var postData = ''
        req.setEncoding("utf-8");
        req.addListener("data", function(data) {
            postData += data;
        });
        req.addListener('end',function(){
            postData = JSON.parse(postData);
            fs.readFile('./orderData.js',function(err,data){
                if(err){
                   throw err;
                   res.writeHead(404, {'Content-Type': 'application/json'});
                   res.end();
                }
                else{
                    data = JSON.parse('['+data+']');
                    data.forEach(function(item,index){
                        if(item.uuid == postData.orderid){
                            data[index].Status = postData.Status; 
                        }
                    });
                    data = JSON.stringify(data);
                    fs.writeFile('./orderData.js',data.substr(1,data.length-2),'utf-8',function(err){
                        if(err){
                           throw err;
                           res.writeHead(404, {'Content-Type': 'application/json'});
                           res.end();
                        }else{
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.write(JSON.stringify({E0019:"ORDER_SUCCESS"}));
                            res.end(); 
                        }
                    })
                    }
            })
        });
    }
	this.submit = function(req,res){
        var postData='';
        var callbackData = {};
        var submitData = {};
        var time = new Date().getTime();
        req.setEncoding("utf-8");
        req.addListener("data", function(data) {
            postData += data;
        });
        req.addListener("end", function() {
            submitData.information = JSON.parse(postData);
            if(submitData.information){
                submitData.information.time = time;
                submitData.information.Status = 0;
                submitData.information.uuid = 9000+Math.round(Math.random()*1000000).toString();
                submitData.type= submitData.information.businessEntrust.split(',');
                delete submitData.information.businessEntrust;
                fs.readFile('./orderType.js',function(err,data){
                    submitData.types = [];
                    submitData.type.forEach(function(item,index){
                        submitData.types.push({
                            type:item,
                            uuid:submitData.information.uuid
                        });
                    });
                    submitData.types = JSON.stringify(submitData.types);
                    submitData.types = submitData.types.substr(1,submitData.types.length-2);
	        		fs.writeFile('./orderType.js',data==''?submitData.types:data+','+submitData.types,'utf-8',function(err){
                        if(err){
                           throw err;
                           res.writeHead(404, {'Content-Type': 'application/json'});
                           res.end();
                        }
	            	});
        		});
                fs.readFile('./orderData.js',function(err,data){
                    fs.writeFile('./orderData.js',data==''?JSON.stringify(submitData.information):data+','+JSON.stringify(submitData.information),'utf-8',function(err){
                        if(err){
                           throw err;
                           res.writeHead(404, {'Content-Type': 'application/json'});
                           res.end();
                        }
                        else{
                           res.writeHead(200, {'Content-Type': 'application/json'});
                           res.write(JSON.stringify({uuid:submitData.information.uuid,E0019:"ORDER_SUCCESS"}));
                           res.end(); 
                        }
                    });
                });
            }
     		else
	        {
	            res.writeHead(404, {'Content-Type': 'text/html'});
	            res.write(JSON.stringify({" E0018":" CONVERT_ERROR"}));
	            res.end();
	        }

        });
	}
    this.uploadSchedule = function(req,res){
        var postData='';
        var callbackData = {};
        var submitData = {};
        var time = new Date().getTime();
        req.setEncoding("utf-8");
        req.addListener("data", function(data) {
            postData += data;
        });
        req.addListener('end',function(){
            console.log(postData);
        })
    }
	module.exports = this;
}()
