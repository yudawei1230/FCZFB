//获取列表模形
var Gateway=Backbone.Model.extend({
    defaults:{
        page:1
    },
    getdatas:function(parm){
        var data = {};
        ajax(function (d) {
            if (d.resultCode == "S0001") {
                data = d;
                if (data.list.length < 1) {
                    flag = false;
                }
            } else {
                $alert(d.remark);
            }
        }, "/platform/bc/v1/select.json",parm,false);
        return data;
    }
});
var Gatewaylist=Backbone.Collection.extend({
    model:Gateway
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
        $(this.el).html(this.template({editway:this.collection.toJSON()}));
    }
});
//获取列表视图
var GeteWayveiw=Backbone.View.extend({
    el:$('body'),
    template: _.template($('#gattpl').html()),
    events:{
        'click .delet':'gatewaydelete',
        'click .edit':'getewayedit',
        'click #serch_bt':'getewayserch',
        'click .addway':'addgetdispay',
        'click .addwaycir':'addgetway',
        'click .editwaycir':'editwaycir',
        'click .cances':'cance'

    },
    initialize:function(){
       this.render()
    },
    render:function(){
       $("#tabl_dishis").html(this.template({gateway:this.collection.toJSON()}));
    },
    gatewaydelete:function(event){
        var lis=event.currentTarget;
        var id=lis.getAttribute("id");
        ajax(function (d) {
            if (d.resultCode == "S0001") {
                $alert("删除成功");
                $("#"+id).parents("tr").remove();
            } else {
                $alert(d.remark);
            }
        },"/platform/bc/v1/delete.json",{id:parseInt(id)});
    },
    addgetdispay:function(){
        $(".mark").show();
        $(".addgetway").show();
    },
    getewayedit:function(event){
        $(".mark").show();
        $(".editgetway").show();
        var lis=event.currentTarget;
        var id=lis.getAttribute("id");
        var getway=new Gateway();
        var gatewaylist = new Gatewaylist(getway.getdatas({id:id}).list);
        var editVeiw=new EditVeiw({collection:gatewaylist});
    },
    editwaycir:function(){
        $(".mark").hide();
        $(".editgetway").hide();
        ajax(function (d) {
            if (d.resultCode == "S0001") {
                $alert("修改成功");
                //查询视图
                var getway=new Gateway();
                var gatewaylist = new Gatewaylist(getway.getdatas({page: getway.get("page")}).list);
                var geteWayveiw=new GeteWayveiw({collection:gatewaylist});
            } else {
                $alert(d.remark);
            }
        },"/platform/bc/v1/update.json",{page: getway.get("page")
            ,serviceUrl:$(".serviceUrl_e").val()
            ,id:$(".id_e").val()
            ,serviceDescribe:$(".serviceDescribe_e").val()
            ,moduleId:$(".moduleId_e").val()
            ,serviceId:$(".serviceId_e").val()
            ,processId:$(".processId_e").val()
            ,status:$(".status_e").val()
            ,isLoginCheck:$(".isLoginCheck_e").val()
            ,isIpCheck:$(".isIpCheck_e").val()
            ,serviceSwitch:$(".serviceSwitch_e").val()
        });

    },
    getewayserch:function(){
        var getway=new Gateway();
        var gatewaylist = new Gatewaylist(getway.getdatas({page: getway.get("page")
            ,serviceUrl:$("#serviceUrl").val()
            ,serviceDescribe:$("#serviceDescribe").val()
            ,moduleId:$("#moduleId").val()
            ,serviceId:$("#serviceId").val()
            ,processId:$("#processId").val()
        }).list);
        var geteWayveiw=new GeteWayveiw({collection:gatewaylist});
    },
    addgetway:function(){
        ajax(function (d) {
            if (d.resultCode == "S0001") {
                $alert("添加成功");
                //查询视图
                var getway=new Gateway();
                var gatewaylist = new Gatewaylist(getway.getdatas({page: getway.get("page")}).list);
                var geteWayveiw=new GeteWayveiw({collection:gatewaylist});
            } else {
                $alert(d.remark);
            }
        },"/platform/bc/v1/insert.json",{page: getway.get("page")
            ,serviceUrl:$(".serviceUrl").val()
            ,serviceDescribe:$(".serviceDescribe").val()
            ,moduleId:$(".moduleId").val()
            ,serviceId:$(".serviceId").val()
            ,processId:$(".processId").val()
            ,status:$(".status").val()
            ,isLoginCheck:$(".isLoginCheck").val()
            ,isIpCheck:$(".isIpCheck").val()
            ,serviceSwitch:$(".serviceSwitch").val()
        });
        $(".mark").hide();
        $(".addgetway").hide();
    },
    cance:function(){
        $(".mark").hide();
        $(".addgetway").hide();
        $(".editgetway").hide();
    }
});
//查询视图
var getway=new Gateway();
var gatewaylist = new Gatewaylist(getway.getdatas({page: getway.get("page")}).list);
var geteWayveiw=new GeteWayveiw({collection:gatewaylist});
console.log(getway.get("page"));



