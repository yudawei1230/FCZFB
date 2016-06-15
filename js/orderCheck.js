	var mySwiper = new Swiper('.swiper-container', {
	        direction: 'horizontal',
	        onlyExternal : true
	});

!function(){
	var module = angular.module('myapp',[]);
	var i =0;
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
				scope.detail.businessEntrust.split(',').forEach(function(item,index){
						if(index==0)
							scope.detail.businessEntrust='';
						if(item==1)
							scope.detail.businessEntrust += '注销抵押,';
						else if(item==2)
							scope.detail.businessEntrust += '房产过户,';
						else if(item==3)
							scope.detail.businessEntrust += '取新房产证,';
						else
							scope.detail.businessEntrust += '贷款抵押,';
					});
				scope.detail.businessEntrust =scope.detail.businessEntrust.slice(0,scope.detail.businessEntrust.length-1);
				mySwiper.slideNext();
				window.scrollTo(0,0);
			},
			scheduleCheck:function(scope,data){
				console.log(data);
				var i;
				if(data.businessEntrust.indexOf('注销抵押')>-1){
					scope.cancel = 'block';
					if(data.cancelStatus){
						for(i=3;i<4;i++,data.cancelStatus--)
						{
							if(data.cancelStatus<1)
								scope.scheduleClass[i] ='undo';
							else
								scope.scheduleClass[i] ='';
						}
							
					}
				}
				else
					scope.cancel = 'none';
				if(data.businessEntrust.indexOf('房产过户')>-1){
					scope.transfer = 'block';
					if(data.transferStatus){
						for(i=5;i<7;i++,data.transferStatus--)
						{
							if(data.transferStatus<1)
								scope.scheduleClass[i] ='undo';
							else
								scope.scheduleClass[i] ='';
						}
					}
				}
				else
					scope.transfer = 'none';
				if(data.businessEntrust.indexOf('取新房产证')>-1){
					scope.hourse = 'block';
					if(data.hourseStatus){
						for(i=8;i<9;i++,data.hourseStatus--)
						{
							if(data.hourseStatus<1)
								scope.scheduleClass[i] ='undo';
							else
								scope.scheduleClass[i] ='';
						}
					}
				}
				else
					scope.hourse = 'none';
				if(data.businessEntrust.indexOf('贷款抵押')>-1){
					scope.loan = 'block';
					if(data.loanStatus){
						for(i=10;i<11;i++,data.loanStatus--)
						{
							if(data.loanStatus<1)
								scope.scheduleClass[i] ='undo';
							else
								scope.scheduleClass[i] ='';
						}
					}
				}
				else
					scope.loan = 'none';
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
										+"<p>{{scheduletext}}</p>"
									+'</section>'
								+'</div>'
								+'<div class="button_sp_area" ng-show="ifshow">'
							    	+'<a href="javascript:;" class="weui_btn weui_btn_mini weui_btn_primary btn_status">查看凭证</a>'
								+'</div>'
							+'</div>',
				link:function(scope,elem,attr){
					scope.scheduletexts=['','预约取号','办理全权交接手续','《注销抵押》办理中','注销抵押完成','《过户》办理中','打印二手买卖合同','过户完成','《取新房产证》办理中','取新房产证办理完成','《代理抵押》办理中','贷款抵押完成'];
					scope.scheduletext = scope.scheduletexts[scope.num];
						
				}
		}
	});
	module.directive('statustext',function(){
		return{
			restrict:'AE',
			scope:{
				text:'@'
			},
			template:'<p ng-bind="content"></p>',
			replace:true,
			link:function(scope,elem,attr){
				if(scope.text==0)
					scope.content='办理中';
				else if(scope.text==1)
					scope.content='待确认';
				else
					scope.content='已完成';
			}
		}
	});
	module.directive('article',function(){
		return{
			restrict:'AE',
			scope:{
				personname:'@',
				businessentrust:'@',
				ordernum:'@'
			},
			template:   '<p ng-bind="num"></p>'
						+'<p ng-bind="name"></p>'			
						+'<p ng-bind="type"></p>',
			link:function(scope,elem,attr){					
				if(scope.ordernum)
				{
					scope.ordernum = '订单号： '+scope.ordernum;
					scope.num = scope.ordernum;
				}
				if(scope.personname)
				{
					scope.personname='预约人姓名： '+scope.personname;
					scope.name = scope.personname;
				}
				if(scope.businessentrust){
					scope.businessentrust.split(',').forEach(function(item,index){
						if(index==0)
							scope.businessentrust='业务类型： ';
						if(item==1)
							scope.businessentrust += '注销抵押,';
						else if(item==2)
							scope.businessentrust += '房产过户,';
						else if(item==3)
							scope.businessentrust += '取新房产证,';
						else
							scope.businessentrust += '贷款抵押,';
					});
					scope.businessentrust =scope.businessentrust.slice(0,scope.businessentrust.length-1);
					scope.type = scope.businessentrust;
				}
				
			}
		}
	});
}()
