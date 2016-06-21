var http = require('http');
var url = require('url');
var querystring = require('querystring');
var postdata = {
    "username":"张三"
};
http.createServer( function (request, response) {  
 var WetchatHead = {
                    hostname:'172.30.60.245',
                    path:'/xwdc-web/searchByUserName',
                    port:8080,
                    method:'POST',
                    headers:{
                      'Content-type':"application/json;charset=UTF-8"
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
}).listen(80);