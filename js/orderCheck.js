	var mySwiper = new Swiper('.swiper-container', {
	        direction: 'horizontal',
	        onlyExternal : true
	});

!function(){
	var module = angular.module('myapp',[]);
	var data = [{
			orderNum:'0000000001',
			name: '张三',
			type:'注销抵押，房产过户',
			status: 0,
			phone:'13580503220',
			helpType:'全权委托,全权委托,全权委托,全权委托',
			identification:'441322199310120234',
			housePlace:'南山',
			houseName:'佳兆业城市广场5503G',
			idNum:'90000000000023',
			statusText: '办理中',
			schedule: 4
	},{
			orderNum:'0000000002',
			name: '李四',
			type:'注销抵押',
			status: 1,
			phone:'13580503220',
			helpType:'全权委托',
			identification:'441322199310120234',
			housePlace:'福田',
			houseName:'佳兆业城市广场5504G',
			idNum:'90000000000024',
			statusText: '待确认',
			schedule: 6
	},{
			orderNum:'0000000003',
			name: '王五',
			type:'注销抵押',
			status: 2,
			phone:'13580503220',
			helpType:'全权委托',
			identification:'441322199310120234',
			housePlace:'龙岗',
			houseName:'佳兆业城市广场5505G',
			idNum:'90000000000025',
			statusText: '已完成',
			schedule: 8
	}
	];
	module.controller('myctrl',['$scope','moduleFunction','moduleDeclaration',function($scope,moduleFunction,moduleDeclaration){
		//变量声明初始化
		moduleDeclaration.init($scope);
		//事件初始化
		moduleFunction.init($scope);
	}]);
	//变量模块
	module.factory('moduleDeclaration',function(){
		return{
			init:function(scope){
				scope.details=data;
				scope.scheduleClass=[];
			}
		}
	})
	//事件初始模块
	module.factory('moduleFunction',['detailCheck',function(detailCheck){
		return{
			init:function(scope){
				scope.orderDetail = function(data){
					detailCheck.check(scope,data.detail);
				};
				scope.scheduleCheck = function(data){
					detailCheck.scheduleCheck(scope,data.detail);
				}
			}
		}
	}]);
	//事件模块
	module.factory('detailCheck',function(){
		return{
			check: function(scope,data){
				scope.detail = data;
				mySwiper.slideNext();
				window.scrollTo(0,0);
			},
			scheduleCheck:function(scope,data){
				for(var i =0;i<=11;i++){
					if(i>data.schedule)
						scope.scheduleClass[i] ='undo';
					else
						scope.scheduleClass[i] ='';
				}
				mySwiper.slideNext();
				window.scrollTo(0,0);
			}
		}
	});
	//业务进度指令
	module.directive('artical',function(){
		return{
				restrict:'AE',
				scope:{
					ifshow:'=',
					num:'='
				},
				template:   '<i class="weui_icon_circle"></i>'
							+'<div class="weui_cell schedule_cell">'
								+'<div class="weui_articel">'
									+'<section ng->'
									+"<p ng-bind='scheduletext'></p>"
									+'</section>'
								+'</div>'
								+'<div class="button_sp_area" ng-show="ifshow">'
							    	+'<a href="javascript:;" class="weui_btn weui_btn_mini weui_btn_primary btn_status">查看凭证</a>'
								+'</div>'
							+'</div>',
				link:function(scope,elem,attr){
					scope.scheduletexts=['','预约取号','办理全权交接手续','1、《注销抵押》办理中','注销抵押完成','2、《过户》办理中','打印二手买卖合同','过户完成','3、《取新房产证》办理中','取新房产证办理完成','4、《代理抵押》办理中','贷款抵押完成'];
					console.log(scope);
					scope.scheduletext = scope.scheduletexts[scope.num];
				}
		}
	});
}()
