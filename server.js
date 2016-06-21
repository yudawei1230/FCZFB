var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
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
var postdata =  {
      "userName":"17707084403",
      "password":"123456",
      "address":"深圳",
      "name":"张三",
      "usex":"男",
      "idcar":"361456789445012155",
      "question":"中国"
   };
http.createServer( function (request, response) {  

   function file(request,response,src,type){
   fs.readFile(src, function (err, data) {
      if (err) {
         response.writeHead(404, {'Content-Type': 'text/'+type});
         response.end();
      }else{            
         response.writeHead(200, {'Content-Type': 'text/'+type});
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
   function png(request,response,src,type){
      fs.readFile(src, "binary", function(error, file) {
         if(error) {
               response.writeHead(500, {"Content-Type": "text/plain"});
               response.write(error + "\n");
               response.end();
         } else {
               response.writeHead(200, {"Content-Type": "image/jpg"});
               response.write(file, "binary");
               response.end();
         }
      });
   }
   function post(){

      var WetchatHead = {
                    hostname:'120.76.133.144',
                    path:'/api/register',
                    port:80,
                    method:'POST',
                    headers:{
                      'Content-type':"application/x-www-form-urlencoded",
                       'Content-Length':postdata.length
                    }
               };
      var req = http.request(WetchatHead,function(res){
            if(res.statusCode === 200)
            {
                  res.setEncoding('utf8');
                  res.on('data',function(body){
                        console.log(body);
                  })
                  res.on('error',function(err){
                        console.log(err);
                  })
                  res.on('end',function(data){
                        console.log('no more data');
                  })
            }
      });
      req.write(querystring.stringify(postdata));
      req.end();
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
         var callbackData = {};
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
                  request.body.bookStatus = Math.round(2*Math.random());
                  if(request.body.bookStatus>=2)
                     request.body.bookImage ='image/yuyuequhao.png';
                  if(request.body.bookStatus==3)
                     request.body.allPrivilegeImage = 'image/quanquanjiaojie.png';

                  if(request.body.transferStatus>=2)
                     request.body.transferContractImage = 'image/maimaihetong.png';
                  if(request.body.transferStatus==3)
                     request.body.transferImage = 'image/guohuwancheng.png';

                  if(request.body.cancelStatus==2)
                     request.body.cancelImage = 'image/diyawancheng.png';

                  if(request.body.hourseStatus==2)
                  request.body.hourseImage = 'image/quxinfangchanzheng.png';

                  if(request.body.loanStatus==2)
                     request.body.loanImage = 'image/daikuandiya.png';

                  request.body.status = Math.round(2*Math.random());
                  request.body.orderNum = 9000+Math.round(Math.random()*1000000).toString();
                  fs.readFile('js/orderData.js',function(err,data){
                     fs.writeFile('js/orderData.js',data==''?JSON.stringify(request.body):data+','+JSON.stringify(request.body),'utf-8',function(err){
                        if(err)
                           throw err;
                        else{
                           callbackData.uuid = request.body.orderNum;
                           callbackData.E0019 = "ORDER_SUCCESS";
                           response.writeHead(200, {'Content-Type': 'text/html'});
                           response.write(JSON.stringify(callbackData));
                           response.end();
                        }
                     });
                  });
               }
               else
               {
                  response.writeHead(404, {'Content-Type': 'text/html'});
                  response.write(JSON.stringify({" E0018":" CONVERT_ERROR"}));
                  response.end();
               }
            }
            else
            {
               callbackData.E0020 = "CONVERT_ERROR";
               response.writeHead(404, {'Content-Type': 'text/html'});
               response.write(JSON.stringify(callbackData));
               response.end();
            }
         });
         
   }
   if(request.url.indexOf('js')!=-1)
      file(request,response,request.url.substr(1),'javascript');
   else if(request.url.indexOf('css')!=-1)
      file(request,response,request.url.substr(1),'css');
   else if(request.url.indexOf('map')!=-1)
      file(request,response,request.url.substr(1),'map');
   else if(request.url.indexOf('png')!=-1)
      png(request,response,request.url.substr(1),'png');
   else if(request.url.indexOf('jpg')!=-1)
      png(request,response,request.url.substr(1),'jpg');
   else if(request.url=='/')
      file(request,response,'login.html','html');
   else if(request.url=='/orderSubmit')
      postdata(request,response);
   else if(request.url.indexOf('.ico')!=-1)
      response.end();
   else if(request.url.indexOf('/order')!=-1)
      file(request,response,'orderCheck.html','html');
   else if(request.url.indexOf('/register')!=-1){
      console.log(request.url);
      post();
   }
   else
      file(request,response,request.url.substr(1)+'.html','html');
 
}).listen(80);
