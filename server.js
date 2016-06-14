var http = require('http');
var fs = require('fs');
var url = require('url');
var data=[];
var dataName=[{
               "personName":"张三",
               "phoneNumber": "18888888888",
               "certificateType":"1",
               "certificateNo":"123456789123456789",               
               "sellerName":"李四",
               "sellerPhoneNumber": "17777777777",
               "sellerCertificateType":"1",
               "sellerCertificateNo":"123456789123456789", 
               "houseAddress":"深圳市",
               "houseName": "AAA",
               "ownershipType":"bbb",
               "ownershipNo":"123456",
               "businessEntrust":"1,2,3,4",
               "formEntrust": "全权委托"
            },{
               "personName":"张三",
               "phoneNumber": "18888888888",
               "certificateType":"1",
               "certificateNo":"123456789123456789",              
               "houseAddress":"深圳市",
               "houseName": "AAA",
               "ownershipType":"bbb",
               "ownershipNo":"123456",          
               "businessEntrust":"1,2,3,4",
               "formEntrust": "全权委托"
            }];
http.createServer( function (request, response) {  

   function file(request,response,src){
   fs.readFile(src, function (err, data) {
      if (err) {
         //console.log(err);
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{            
         response.writeHead(200, {'Content-Type': 'text/html'});  
         response.write(data.toString());    
      }
      response.end();
   });  
   }
   function postdata(request,response,next){
         var postData='';
         request.setEncoding("utf8");
         request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
         });
         request.addListener("end", function() {
            request.body = JSON.parse(postData);
            next();
         });
   }
   if(request.url.indexOf('.')!=-1)
      file(request,response,request.url.substr(1));
   else if(request.url.indexOf('?')!=-1)
      postdata(request,response,function(){
         console.log(request.query)
      });
   else if(request.url.indexOf('index')!=-1)
      file(request,response,'index.html');
   else
      postdata(request,response,function(){
         if(request.body.sellerCertificateType)
            var type =0;
         else
            var type =1;
            for(var i in dataName[type]){
               if(!request.body[i])
               {
                  response.writeHead(404, {'Content-Type': 'text/html'});
                  response.write('false');
                  response.end();
               }
            }
         data.push(request.body);
         response.writeHead(200, {'Content-Type': 'text/html'});
         response.write('true');
         response.end();
      });
   
 
}).listen(200);
