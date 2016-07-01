//获取列表模形
var ErrorCode = Backbone.Model.extend({
    defaults: {
        page: 0,
        pageSize: 10,
        totalPage:1,
        errorCode:""
    },
    getdatas: function (parm) {
        var data = {};
        ajax(function (d) {
            if (d.resultCode == "1") {
                data = d;
                if (data.errorCodeList.length < 1) {
                    flag = false;
                }
            } else if (d.resultCode == "0") {
                $alert("系统异常");
            } else {
                $alert(d.errorDesc);
            }
        }, "/public/public/errorcode/v1/getErrorCodeList.json", parm, false);
        return data;
    }
});
var ErrorCodelist = Backbone.Collection.extend({
    model: ErrorCode
});
//编辑视图
 var EditVeiw=Backbone.View.extend({
 el:'#editgetway',
 template: _.template($("#editpl").html()),
 events:{
 'click .editwaycir':'editwaycir'
 },
 initialize:function(){
 this.render()
 },
 render:function(){
 $(this.el).html(this.template({errorCode:this.collection.toJSON()}));
 },
     editwaycir:function(){
         $(".mark").hide();
         $(".editgetway").hide();
         ajax(function (d) {
             if (d.resultCode == "1") {
                 $alert("修改成功");
                 var codeList = new ErrorCodelist(errorcode.getdatas({
                     "paramMap": {
                         pageNo: errorcode.get("page"),
                         pageSize: errorcode.get("pageSize")
                     }
                 }).errorCodeList);
                 var codeView = new ErrorCodeveiw({collection: codeList});
             } else {
                 $alert("系统异常");
             }
         },"/public/public/errorcode/v1/updateErrorCode.json",{
             errorDescInternal: $(".errorDescInternal_e").val(),
             errorDescToUser: $(".errorDescToUser_e").val(),
             newErrorCode: $(".errorCode_e").val(),
             errorCode:$(".id_errorCode").val()
         });

     },
 });
//获取列表视图
var ErrorCodeveiw = Backbone.View.extend({
    el: $('body'),
    template: _.template($('#erortpl').html()),
    events: {
        'click .delet': 'gatewaydelete',
        'click .edit': 'getewayedit',
        'click #serch_bt': 'getewayserch',
        'click .addway': 'addgetdispay',
        'click .addwaycir': 'addgetway',
        'click .cances': 'cance',
        'click .prepage':'prepage',
        'click .nextpage':'nextpage'

    },
    initialize: function () {
        this.render()
    },
    render: function () {
        $("#tabl_dishis").html(this.template({errorCode: this.collection.toJSON()}));
    },
    prepage:function(){

        if(errorcode.get("page")==0){
            errorcode.set("page",0);
        }else{
            errorcode.set("page",errorcode.get("page")-1);
        }

    },
    nextpage:function(){

        if(errorcode.get("page")==errorcode.get("totalPage")||errorcode.get("page")>errorcode.get("totalPage")){
            errorcode.set("page",errorcode.get("totalPage"));
        }else{
            errorcode.set("page",errorcode.get("page")+1);
        }

    },
    getewayserch: function () {
        var errorcode = new ErrorCode();
        var codeList = new ErrorCodelist(errorcode.getdatas(
            {
                "paramMap": {
                    pageNo: errorcode.get("page"),
                    pageSize: errorcode.get("pageSize"),
                    errorDescInternal: $("#errorDescInternal").val(),
                    errorDescToUser: $("#errorDescToUser").val(),
                    errorCode: $("#errorCode").val()
                }
            }
        ).errorCodeList);
        var codeView = new ErrorCodeveiw({collection: codeList});
    },
    addgetdispay: function () {
        $(".mark").show();
        $(".addgetway").show();
    },
    addgetway: function () {
        ajax(function (d) {
                if (d.resultCode == "1") {
                    $alert("添加成功");
                    var codeList = new ErrorCodelist(errorcode.getdatas({
                        "paramMap": {
                            pageNo: errorcode.get("page"),
                            pageSize: errorcode.get("pageSize")
                        }
                    }).errorCodeList);
                    var codeView = new ErrorCodeveiw({collection: codeList});
                } else if(d.resultCode == "0"){
                    $alert("系统异常");
                }else{
                    $alert(d.errorDesc);
                }
            }, "/public/public/errorcode/v1/saveErrorCode.json", {
                    errorDescInternal: $(".errorDescInternal").val(),
                    errorDescToUser: $(".errorDescToUser").val(),
                    errorCode: $(".errorCode").val()

            }
        );
        $(".mark").hide();
        $(".addgetway").hide();
    },
    getewayedit:function(event){
        $(".mark").show();
        $(".editgetway").show();
        var lis=event.currentTarget;
        var errorCode=lis.getAttribute("id");
        errorcode.set("errorCode",errorCode);

    },
    cance: function () {
        $(".mark").hide();
        $(".addgetway").hide();
        $(".editgetway").hide();
    }
});
//查询视图
var errorcode = new ErrorCode();
var codeList = new ErrorCodelist(errorcode.getdatas({
    "paramMap": {
        pageNo: errorcode.get("page"),
        pageSize: errorcode.get("pageSize")
    }
}).errorCodeList);
var codeView = new ErrorCodeveiw({collection: codeList});

errorcode.on("change:page",function(){
   var codeList = new ErrorCodelist(errorcode.getdatas({
    "paramMap": {
    pageNo: errorcode.get("page"),
    pageSize: errorcode.get("pageSize")
    }
   }).errorCodeList);
    var codeView = new ErrorCodeveiw({collection: codeList});
 });
errorcode.on("change:errorCode",function(){
    var codeList = new ErrorCodelist(errorcode.getdatas({
        "paramMap": {
            pageNo: 0,
            pageSize: errorcode.get("pageSize"),
            errorCode: errorcode.get("errorCode")
        }
    }).errorCodeList);
    var editVeiw=new EditVeiw({collection:codeList});
});


