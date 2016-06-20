var http = require('http');
var url = require('url');
var querystring = require('querystring');
http.createServer( function (request, response) {  
 var WetchatHead = {
                    hostname:'172.30.60.90',
                    path:'/api/register',
                    port:7071,
                    method:'POST',
                    headers:{
                      'Content-type':"application/x-www-form-urlencoded"
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

      req.end();
      response.end();
}).listen(80);