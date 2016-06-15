var http = require('http');
var fs = require('fs');
var url = require('url');
var dataName=[{
               "personName":"",
               "phoneNumber": "",
               "certificateType":"",
               "certificateNo":"",               
               "sellerName":"",
               "sellerPhoneNumber": "",
               "sellerCertificateType":"",
               "sellerCertificateNo":"", 
               "houseAddress":"",
               "houseName": "",
               "ownershipType":"",
               "ownershipNo":"",
               "businessEntrust":"",
               "formEntrust": ""
            },{
               "personName":"",
               "phoneNumber": "",
               "certificateType":"",
               "certificateNo":"",              
               "houseAddress":"",
               "houseName": "",
               "ownershipType":"",
               "ownershipNo":"",          
               "businessEntrust":"",
               "formEntrust": ""
            }];
http.createServer( function (request, response) {  

   function file(request,response,src){
   fs.readFile(src, function (err, data) {
      if (err) {
         response.writeHead(404, {'Content-Type': 'text/html'});
         response.end();
      }else{            
         response.writeHead(200, {'Content-Type': 'text/html'});
         if(src =='js/orderCheck.js')  
            fs.readFile('js/orderData.js',function(errs,datas){
               response.write('var data =['+datas+'];'+data.toString());  
               response.end();  
            });
         else{
            response.write(data.toString()); 
            response.end();
         }
               
      }
      
   });  
   }
   function validate(request,type){
         for(var i in dataName[type]){
            if(!request.body[i])
               return false;
            else if(request.body[i]=='')
               return false;
         }
         return true;
   }
   function postdata(request,response){
         var postData='';
         request.setEncoding("utf8");
         request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
         });
         request.addListener("end", function(next) {
            request.body = JSON.parse(postData);
            if(request.body){
               if(request.body.sellerCertificateType)
                  var type =0;
               else
                  var type =1;
               if(validate(request,type)){
                  request.body.businessEntrust.split(',').forEach(function(item,index){
                     if(item==1)
                        request.body.cancelStatus= Math.round(2*Math.random());
                     else if(item==2)
                        request.body.transferStatus= Math.round(3*Math.random());
                     else if(item==3)
                        request.body.hourseStatus= Math.round(2*Math.random());
                     else 
                        request.body.loanStatus= Math.round(2*Math.random());
                  });
                  request.body.schedule = 10*Math.random().toFixed(1);
                  request.body.status = Math.round(2*Math.random());
                  request.body.orderNum = 9000+Math.round(Math.random()*1000000).toString();
                  fs.readFile('js/orderData.js',function(err,data){
                     fs.writeFile('js/orderData.js',data==''?JSON.stringify(request.body):data+','+JSON.stringify(request.body),'utf-8',function(err){
                        if(err)
                           throw err;
                        console.log(err);
                     });
                  });
                  response.writeHead(200, {'Content-Type': 'text/html'});
                  response.write('true');
               }
               else
               {
                  response.writeHead(404, {'Content-Type': 'text/html'});
                  response.write('false');
               }
               response.end();
            }
         });
         
   }
   function getdata(request,response){
   }
   if(request.url.indexOf('.')!=-1)
      file(request,response,request.url.substr(1));
   else if(request.url.indexOf('?')!=-1)
      getdata(request,response);
   else if(request.url=='/')
      file(request,response,'index.html');
   else if(request.url=='/order')
      file(request,response,'orderCheck.html');
   else
      postdata(request,response);
 
}).listen(80);
