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
	this.submit = function(req,res){
        var postData='';
        var callbackData = {};
        req.setEncoding("utf-8");
        req.addListener("data", function(data) {
            postData += data;
        });
        req.addListener("end", function() {
            req.body = JSON.parse(postData);
            if(req.body){
                req.body.businessEntrust.split(',').forEach(function(item,index){
	                if(item==1)
	                    req.body.cancelStatus= [];
	                else if(item==2)
	                    req.body.transferStatus= [];
	                else if(item==3)
	                    req.body.hourseStatus= [];
	                else 
	                    req.body.loanStatus= [];
            	});
                req.body.bookImage ='';
                req.body.allPrivilegeImage = '';
                req.body.transferContractImage = '';
                req.body.transferImage = '';
                req.body.cancelImage = '';
                req.body.hourseImage = '';
                req.body.loanImage = '';
                req.body.status = 0;
                req.body.bookStatus =0;
                req.body.uuid = 9000+Math.round(Math.random()*1000000).toString();
                fs.readFile('./orderData.js',function(err,data){
	        		fs.writeFile('./orderData.js',data==''?JSON.stringify(req.body):data+','+JSON.stringify(req.body),'utf-8',function(err){
			            if(err)
			               throw err;
			            else{
			               res.writeHead(200, {'Content-Type': 'application/json'});
			               res.write(JSON.stringify({uuid:req.body.uuid,E0019:"ORDER_SUCCESS"}));
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
	module.exports = this;
}()
