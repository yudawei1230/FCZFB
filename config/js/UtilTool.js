/*表单*/
function Regexp(){};
//重置手机分缩放设置
Regexp.prototype.resetDeviceScale=function(){
    //获取屏幕尺寸
    var width=document.documentElement.getBoundingClientRect().width;
    if(width>640){
        width=640;
    }
    document.documentElement.style.fontSize=(width*40/640)+"px";
}
!function(){
    window.addEventListener("resize",function(){
        Regexp.prototype.resetDeviceScale();
    },false);
    window.addEventListener("pageshow",function(e){
        if(e.persisted){
            Regexp.prototype.resetDeviceScale();
        }
    },false);
    if(document.readyState=="complete"){
        Regexp.prototype.resetDeviceScale();
    }else{
        document.addEventListener("DOMContentLoaded",function(e){
            Regexp.prototype.resetDeviceScale();
        },false);
    }
}();
//是否为空
Regexp.prototype.is_null=function(obj){
    if(Regexp.prototype.formatStr(obj.val())==""){
        return true
    }else{
        return false;
    }
}
//失去焦点
Regexp.prototype.issubmint=function(obj,f,isseclect){
    var that=this;
   $.each(obj,function(i){
           if (that.is_null(obj[i])) {
               f = false;
           }

  });
    return f;
}
//倒计时
Regexp.prototype.time_out=function(obj,time,text){
    obj.html(time+"s后再获取");
    $(".pverifybt").addClass("hasclick");
    var f=setInterval(function(){
        --time;
        if(time==0){
            obj.html(text);
            $(".pverifybt").removeClass("hasclick");
            clearInterval(f);
        }else{
            obj.html(time+"s后再获取");
        }
    },1000);

}
//周期  星期几
Regexp.prototype.week=function(dates,isfome){
    var strs="";
    var ssdate="";
    var riqi=dates.substr(0,10);
    var arys1= new Array();
    arys1=riqi.split('-');     //日期为输入日期，格式为 2013-3-10
    if(!isfome){
      ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
    }else{
        ssdate=new Date(dates[0],parseInt(dates[1]-1),dates[2]);
    }
    //ssdate.getDay();  //就是你要的星期几
    console.log(ssdate.getDay());
    switch (ssdate.getDay()){
        case 0:
            strs="周天";
            break;
        case 1:
            strs="周一";
            break;
        case 2:
            strs="周二";
            break;
        case 3:
            strs="周三";
            break;
        case 4:
            strs="周四";
            break;
        case 5:
            strs="周五";
            break;
        case 6:
            strs="周六";
            break;
    }

    return strs;
}
//取时分秒后几位
Regexp.prototype.afterhsm=function(srt,inte,isfome){
    var hms="";
    if(!isfome) {
        return srt.substring(srt.length - inte);
    }else{
        hms=srt.substring(srt.length-inte);
        return hms.substr(0,2)+":"+hms.substr(2,2)+":"+hms.substr(4,2);
    }

}
//取前年月日几位
Regexp.prototype.berforhsm=function(srt,inte,isfome){
    var ymd="";
    if(!isfome) {
        return srt.substr(0, inte);
    }else {
         ymd= srt.substr(0,inte);
         return ymd.substr(0,4)+"-"+ymd.substr(4,2)+"-"+ymd.substr(6,2);
    }
}
//取字符串后几位
Regexp.prototype.afterstr=function(srt,inte){
    return srt.substring(srt.length-inte);
}
//取字符串前几位
Regexp.prototype.berforstr=function(srt,inte){
    return srt.substr(0,inte);
}
//四舍五入
Regexp.prototype.decimal=function(num, v) {
    if (num == null) {
        num = 0;
    }
    var vv = Math.pow(10, v);
    return (Math.round(num * vv) / vv).toFixed(2);

}
//三位数加逗号
Regexp.prototype.formatNum=function(str) {
    if (str == null) {
        str = "0";
    }
    var newStr = "";
    var count = 0;
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ""; //自动补小数点后两位
        // console.log(str)
    }
    else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        //console.log(str)
    }
    return str;
}
//判断字是否在数组里
Regexp.prototype.isInArray=function(value,arr){
    if(!arr || !arr.length)return;
    for(var i=0,l=arr.length;i<l;++i){
        if(value==arr[i]){
            return true;
        }
    }
    return false;
}
//获取url后的参数
Regexp.prototype.getURLRequestParam=function(url,obj){
    if(url){
        if(url.indexOf("?")>-1){
            url=url.substring(url.indexOf("?")+1);
        }else{
            url="";
        }
    }else{
        url=location.search.length?location.search.substring("1"):"";
    }
    var params=url.length?url.split("&"):[],temp;
    obj||(obj={});
    for(var i=0,l=params.length;i<l;++i){
        temp=params[i].split("=");
        obj[temp[0]]=temp[1];
    }
    return obj;
}
//获取第二个问号后的url后的参数
Regexp.prototype.getTowURLRequestParam=function(url,obj){
    if(url){
        if(url.lastIndexOf("?")>-1){
            url=url.substring(url.lastIndexOf("?")+1);
        }else{
            url="";
        }
    }else{
        url=location.search.length?location.search.substring("1"):"";
    }
    var params=url.length?url.split("&"):[],temp;
    obj||(obj={});
    for(var i=0,l=params.length;i<l;++i){
        temp=params[i].split("=");
        obj[temp[0]]=temp[1];
    }
    return obj;
}
//获取url后的参数
Regexp.prototype.getURLParam=function(url,obj){//obj 可选参数，tokenType可选参数支持 sessionId，tpfToken;不传默认为 sessionId
    obj=Regexp.prototype.getURLRequestParam(url);
    return obj;
}
//创建mask
Regexp.prototype.creatmask=function(){
    var mask=$("<div class='mark'></div>");
    return mask;
}
//创建弹框  有取消按钮有确定按钮
Regexp.prototype.creatalertok=function(tittext,titdet){
    var alertok=$("<div class='alertok'>"+
       "<div class='alert_title'>"+tittext+"</div>"+
       "<div class='alert_text'>"+titdet+"</div>"+
    "<div class='alert_bt'><p class='cbt'>取消</p><p class='cirbt'>确认</p></div>"+
    "</div>");
    return alertok;
}
//创建弹框  只有确定按钮
Regexp.prototype.creatNOok=function(tittext,titdet,btntext,isleft){
    var textstr="";
    if(isleft){
        textstr="<div class='alert_text1'>"+titdet+"</div>";
    }else{
        textstr="<div class='alert_text'>"+titdet+"</div>";
    }
    var alertok=$("<div class='alertok'>"+
        "<div class='alert_title'>"+tittext+"</div>"+
        textstr+
        "<div class='alert_bt1'><p class='cirbt'>"+btntext+"</p></div>"+
        "</div>");
    return alertok;
}
//创建无标题  只有确定按钮
Regexp.prototype.creatNOtitleok=function(titdet,btntext,isleft){
    var textstr="";
    if(isleft){
        textstr="<div class='alert_text1'>"+titdet+"</div>";
    }else{
        textstr="<div class='alert_text3'>"+titdet+"</div>";
    }
    var alertok=$("<div class='alertok'>"+textstr+
        "<div class='alert_bt1'><p class='cirbt'>"+btntext+"</p></div>"+
        "</div>");
    return alertok;
}
//创建透视框
Regexp.prototype.creatmyok=function(titdet,isleft){
    var textstr="";
    if(isleft){
        textstr="<div class='alert_text1'>"+titdet+"</div>";
    }else{
        textstr="<div class='alert_text2'>"+titdet+"</div>";
    }
    var alertok=$("<div class='alertok'>"+ textstr+ "</div>");
    return alertok;
}
//弹出框位于中间
Regexp.prototype.Alertkuan=function(obj,mark,fn){
    var screenWidth = $(window).width(), screenHeight = $(window).height();
    var objLeft = (screenWidth - obj.width())/2 ;
    var objTop = (screenHeight - obj.height())/2;
    var srollTop=$(document).scrollTop();
    if(srollTop==undefined) srollTop=0;
    obj.css({left:objLeft+"px",top:objTop+"px","display":"block"});
    mark.show();
    fn&&fn();
    $(window).resize(function(){
        var screenWidth = $(window).width(), screenHeight = $(window).height();
        var objLeft = (screenWidth - obj.width())/2 ;
        var objTop = (screenHeight - obj.height())/2;
        var srollTop=$(document).scrollTop();
        obj.css({left:objLeft+"px",top:objTop+"px","display":"block"});
    });
    $(window).scroll(function(){
        var screenWidth = $(window).width(), screenHeight = $(window).height();
        var objLeft = (screenWidth - obj.width())/2 ;
        var objTop = (screenHeight - obj.height())/2;
        var srollTop=$(document).scrollTop();
        obj.css({left:objLeft+"px",top:objTop+"px","display":"block"});
    });

}
//弹出确认取消弹出框
Regexp.prototype.Alertokbtn=function(tittext,titdet,fn){
    var mask=Regexp.prototype.creatmask();
    var creatlertOk=Regexp.prototype.creatalertok(tittext,titdet);
    $("body").append(mask);
    $("body").append(creatlertOk);
    Regexp.prototype.Alertkuan(creatlertOk,mask,function(){
        $(".cbt").click(function(){
            creatlertOk.remove();
            mask.remove();
        });
        $(".cirbt").click(function(){
            creatlertOk.remove();
            mask.remove();
            fn&&fn();
        });
    });

}
//弹出只有确认弹出框
Regexp.prototype.Alertcormbtn=function(tittext,titdet,btntext,isleft){
    var mask=Regexp.prototype.creatmask();
    btntext?btntext=btntext:btntext="确定";
    var creatlertOk=Regexp.prototype.creatNOok(tittext,titdet,btntext,isleft);

    $("body").append(mask);
    $("body").append(creatlertOk);
    Regexp.prototype.Alertkuan(creatlertOk,mask,function(){
        $(".cirbt").click(function(){
            creatlertOk.remove();
            mask.remove();

        });
    });

}
//弹出创建透视框
Regexp.prototype.AlertMyOk=function(titdet,btntext,isleft){
    var mask=Regexp.prototype.creatmask();
    btntext?btntext=btntext:btntext="确定";
    var creatmyok=Regexp.prototype.creatmyok(titdet,isleft);
    $("body").append(mask);
    $("body").append(creatmyok);
    Regexp.prototype.Alertkuan(creatmyok,mask,function(){
           setTimeout(function(){
               creatmyok.remove();
               mask.remove();
           },3000)
    });

}
//弹出无标题的只有确认弹出框
Regexp.prototype.AlertNOtitleok=function(titdet,btntext,isleft,fn){
    var mask=Regexp.prototype.creatmask();
    btntext&btntext!=""?btntext=btntext:btntext="确定";
    var creatNOtitleok=Regexp.prototype.creatNOtitleok(titdet,btntext,isleft);
    $("body").append(mask);
    $("body").append(creatNOtitleok);
    Regexp.prototype.Alertkuan(creatNOtitleok,mask,function(){});
    $(".cirbt").click(function(){
        creatNOtitleok.remove();
        mask.remove();

    });
}
//二维码点确定弹执行事件
Regexp.prototype.AlertNOtitleokfn=function(titdet,btntext,isleft,fn){
    var mask=Regexp.prototype.creatmask();
    btntext&btntext!=""?btntext=btntext:btntext="确定";
    var creatNOtitleok=Regexp.prototype.creatNOtitleok(titdet,btntext,isleft);
    $("body").append(mask);
    $("body").append(creatNOtitleok);
    Regexp.prototype.Alertkuan(creatNOtitleok,mask,function(){});
    $(".cirbt").click(function(){
        creatNOtitleok.remove();
        mask.remove();
        window.location.reload();
    });
}
//取小数点后两位 不四舍五入
Regexp.prototype.toFixed2=function(count){
    return parseFloat(count.toString().replace(/(\.\d{2})\d+$/,"$1"));

}
//是否是数组
Regexp.prototype.isArray=function(key){
   return key instanceof Array;

}
//设置缓存数据
Regexp.prototype.ss={
//设置缓存数据
set:function(key,val){
        val=typeof val=="object"?JSON.stringify(val):val;
        if(key){
            window.sessionStorage.setItem(key,val);
        }
},
//获取缓存数据
get:function(key){
    var r=null;
    if(key){
        r=sessionStorage.getItem(key);
        //r=typeof r=="object"?JSON.parse(r):r;
        try{
            r=JSON.parse(r);
        }catch(e){

        }
    }
    return r;
},
//删除缓存数据
del:function(key){
    if(key){
        if(Regexp.prototype.isArray(key)){
            for(var i=0,l=key.length;i<l;++i){
                sessionStorage.removeItem(key[i]);
            }
        }else{
            sessionStorage.removeItem(key);
        }
    }
}
}
//去空格
Regexp.prototype.formatStr=function(str){
    return str?$.trim(str):"";
}
//请求时加载图片
Regexp.prototype.loading=function(){
    var src='data:image/gif;base64,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';
    $("body").append("<image class='__loadingimage' src="+src+" style='position:absolute;left:50%;top:50%;margin-top:-16px;margin-left:-16px;'/>");
}
//移除加载图片
Regexp.prototype.removeLoading=function(){
    $(".__loadingimage").remove();
}
//ajax获取数据
Regexp.prototype.getDataJSON=function(fn,url,params,b,method){//获取数据方法
    var arg=[];
    b=b===false?false:true;
    $.ajax({
        type:method||"POST",
        async:b,
        url:url,
        data: JSON.stringify(params||{}),
        dataType:"json",
        contentType:"application/json",
        beforeSend: function () {
            Regexp.prototype.loading();
        },
        success:function(data,status,xhr){//接收 json对象
            Regexp.prototype.removeLoading();
            data=typeof data=="string"?eval("("+data+")"):data;
            arg.push(data);
            fn.apply(window,arg.splice(arg.length-1,1));
        },
        error:function(){
            Regexp.prototype.removeLoading();
        }
    });
}