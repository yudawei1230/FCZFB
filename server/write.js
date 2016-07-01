!function(){
	var fs = require('fs')
    var multiparty = require('multiparty');
    var read = require('./read.js');
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
        var form = new multiparty.Form({uploadDir: '../upload/'});
        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            var file = JSON.parse(JSON.stringify(files,null,2));
            var data = JSON.parse(JSON.stringify(fields,null,2));
        if(err){
            console.log('parse error: ' + err);
        } else {
            if(file.file){
                var uploadedPath = file.file[0].path+'';
                var dstPath = '../upload/' + file.file[0].originalFilename;
                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function(err) {
                    if(err){
                        console.log('rename error: ' + err);
                    }else{
                        var orderData = read.readFile('./orderSchedule.js');
                        var time = new Date().getTime();
                        var newData = JSON.stringify({'uuid':data.orderid[0],'schedule':data.schedule[0],'scheduleImage':dstPath,'uploadTime':time});
                        if(orderData!='')
                            orderData = orderData+','+newData;
                        else
                            orderData = newData;
                        if(this.writeFile('./orderSchedule.js',orderData))
                        {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.write(JSON.stringify({S0023:"ORDER_SUCCESS"}));
                            res.end();  
                        }
                    }
                });
            }
            else{
                var orderData = read.readFile('./orderSchedule.js');
                var time = new Date().getTime();
                var newData = JSON.stringify({'uuid':data.orderid[0],'schedule':data.schedule[0],'uploadTime':time});
                if(orderData!='')
                    orderData = orderData+','+newData;
                else
                    orderData = newData;
                if(this.writeFile('./orderSchedule.js',orderData))
                {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.write(JSON.stringify({S0023:"ORDER_SUCCESS"}));
                    res.end();  
                }
            }
        }
    });
    }
    this.writeFile = function(src,data){
        try{
            fs.writeFileSync(src,data);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
        
    }
	module.exports = this;
}()
