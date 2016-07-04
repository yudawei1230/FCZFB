var appindex = angular.module("app_index", []);
appindex.controller('appindexController', ['$scope','init', function ($scope,init) {
	init.init($scope);
}]);
function drag(event,pic){
	event.dataTransfer.setData("Text",JSON.stringify(pic));
}
function allowDrop(event)
{
	event.preventDefault();
}
function drop(event,type,id,index){
	event.preventDefault();
	var data=JSON.parse(event.dataTransfer.getData("Text"));
	var scope = drop.prototype.scope;
	if(index!==false){
		scope.page.pages[0].areas[type].blocks[index-1].block[id].icon = data.icon;
		scope.page.pages[0].areas[type].blocks[index-1].block[id].text = data.text;
		scope.page.pages[0].areas[type].blocks[index-1].block[id].uri = data.uri;
	}
	else
	{
		scope.page.pages[0].areas[type].blocks[id].icon = data.icon;
		scope.page.pages[0].areas[type].blocks[id].text = data.text;
		scope.page.pages[0].areas[type].blocks[id].uri = data.uri;
	}
	scope.$digest();
}
appindex.factory('init',function(){
	function initVa(scope){
	    scope.page ={
	        pages:[{
	            "version":1,
	            "menu":[
			            {                
			            	"type": 1,
			                "index": 0,
			                "title": "首页",
			                "icon": "images/tab_首页2@2x.png",
			                "iconChecked": "xxxx.png",
			                "textColor": "#ddbdce",
			                "textColorChecked": "#adbed",
			                "checked": true}
			                ,{                
			            	"type": 1,
			                "index": 0,
			                "title": "理财",
			                "icon": "images/tab_理财2@2x.png",
			                "iconChecked": "xxxx.png",
			                "textColor": "#ddbdce",
			                "textColorChecked": "#adbed",
			                "checked": true}
			                ,{                
			            	"type": 1,
			                "index": 0,
			                "title": "收款",
			                "icon": "images/tab_收款2@2x.png",
			                "iconChecked": "xxxx.png",
			                "textColor": "#ddbdce",
			                "textColorChecked": "#adbed",
			                "checked": true}
			                ,{                
			            	"type": 1,
			                "index": 0,
			                "title": "我的",
			                "icon": "images/tab_我的2@2x.png",
			                "iconChecked": "xxxx.png",
			                "textColor": "#ddbdce",
			                "textColorChecked": "#adbed",
			                "checked": true
			            }
	                ],
	            "areas":[{
	                "type": 0,
	                "index": 1,
	                "text":'广告',
	                "blocks":[]
	            },{
	                "type": 1,
	                "index": 2,
	                "text":'一级区域',
	                "blocks":[{'icon':'images/icon_w.png','uri':'','text':'',"id":0},{'icon':'images/icon_w.png','uri':'','text':'',"id":1}]
	            },{
	                "type": 2,
	                "index": 3,
	                "text":'二级区域',
	                "blocks":[{'icon':'images/new_per.png','uri':'','text':['新人专享','领取5000元优惠券'],"id":0},{'icon':'images/hui_zh.png','uri':'','text':['汇赚钱','收益年化14%'],"id":1},{'icon':'images/help_h.png','uri':'','text':['帮你还','借款就告我'],"id":2}]
	            },{
	                "type": 3,
	                "index": 4,
	                "text":'三级区域',
	                "blocks":[{'col':1,'block':[{'icon':'images/icon_w.png','uri':'','text':'',"id":0},{'icon':'images/icon_w.png','uri':'','text':'',"id":1},{'icon':'images/icon_w.png','uri':'','text':'',"id":2}]}]
	            }]
	        }]
	    };
	    scope.pics=[{                        
                        "icon": "images/3icon_房贷@2x.png",
                        "uri": "http://ad.iboxpay.com/wallet/production_intro.html",
                        "text":'房贷',
                        "id":0
                        },{                        
                        "icon": "images/licon_baoxian.png",
                        "uri": "http://ad.iboxpay.com/wallet/production_intro.html",
                        "text":'躲雨',
                        "id":1
                        },{                        
                        "icon": "images/licon_yinhk.png",
                        "uri": "http://ad.iboxpay.com/wallet/production_intro.html",
                        "text":'刷卡',
                        "id":2
                        }];
        scope.choice ={
        	id:0
        };
	}
	function initFn(scope){
		drop.prototype.scope = scope;
		scope.add = function(index){
			scope.page.pages[0].areas[index].blocks.push({'icon':'images/icon_w.png','uri':'','text':'','id':scope.page.pages[0].areas[index].blocks.length});
		}
		scope.delete = function(index){
			scope.page.pages[0].areas[index].blocks.pop();
		}
		scope.addThreeItem = function(index){
			scope.page.pages[0].areas[3].blocks[index-1].block.push({'icon':'images/icon_w.png','uri':'','text':'','id':scope.page.pages[0].areas[3].blocks[index-1].block.length});
		}
		scope.deleteThreeItem = function(index){
			scope.page.pages[0].areas[3].blocks[index-1].block.pop();
		}
		scope.choose = function(pic){
			if(scope.choice&&scope.choice.index){
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.index-1].block[scope.choice.id].icon = pic.icon;
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.index-1].block[scope.choice.id].text = pic.text;
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.index-1].block[scope.choice.id].uri = pic.uri;
			}
			else if(scope.choice.type){
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.id].icon = pic.icon;
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.id].text = pic.text;
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.id].uri = pic.uri;
			}
			scope.choice={};
		}
		scope.submit = function(){
			console.log(scope.page.pages[0])
		}
		scope.addThree = function(){
			scope.page.pages[0].areas[3].blocks.push({"col":scope.page.pages[0].areas[3].blocks.length+1,'block':[{'icon':'images/icon_w.png','uri':'','text':'','id':0}]});
		}
		scope.deleteThree = function(){
			scope.page.pages[0].areas[3].blocks.pop();
		}
	}
	return{
		init:function(scope){
			initVa(scope);
			initFn(scope);
		}
	}
})