!function(){
	var fs = require('fs');
	this.file = function(req,res,src,type){
		if(type=='jpg'||type=='png'||type=='img')
			fs.readFile('..'+src,'binary',function(err,file){
				if(err){
					throw err;
				}
				else{
		        	res.writeHead(200, {'Content-Type': 'image/'+type});
	        		res.write(file,'binary');
	        		res.end();  
				}
			});
		else
			fs.readFile('..'+src,function(err,data){
		        if (err) {
		        	res.writeHead(404, {'Content-Type': 'text/'+type});
		        	res.write(err.toString()); 
		        	res.end();
		        }
		        else{
	            	res.writeHead(200, {'Content-Type': 'text/'+type});
		            res.write(data.toString()); 
		            res.end();     
		      }
			})
	}
	module.exports = this;
}()
