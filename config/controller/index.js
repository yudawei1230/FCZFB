var appindex = angular.module("app_index", []);
appindex.controller('appindexController', ['$scope','init', function ($scope,init) {
	init.init($scope);
}]);

appindex.factory('init',function(){
	function initVa(scope){
	    scope.page ={
	        pages:[{
	            "version":1,
	            "menu":{},
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
	                "blocks":[]
	            },{
	                "type": 3,
	                "index": 4,
	                "text":'三级区域',
	                "blocks":[]
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
		scope.add = function(index){
			scope.page.pages[0].areas[index].blocks.push({'icon':'images/icon_w.png','uri':'','text':'','id':scope.page.pages[0].areas[index].blocks.length});
		}
		scope.delete = function(index){
			scope.page.pages[0].areas[index].blocks.pop();
		}
		scope.choose = function(pic){
			if(scope.choice.type){
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.id].icon = pic.icon;
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.id].text = pic.text;
				scope.page.pages[0].areas[scope.choice.type].blocks[scope.choice.id].uri = pic.uri;
			}
			scope.choice={};
		}
		scope.submit = function(){
			console.log(scope.page.pages[0])
		}
	}
	return{
		init:function(scope){
			initVa(scope);
			initFn(scope);
		}
	}
})