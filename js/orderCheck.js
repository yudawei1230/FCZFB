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
				scope.mask = 'none';
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
				};
				scope.showmask = function(num,data){
					console.log(data);
					if(num ==1)
					{
						scope.title = '预约取号凭证';
						scope.image = this.bookImage;
						scope.bind = '预约取号';
					}
					scope.mask='block';
				};
				scope.closemask = function(data){
					scope.mask= 'none';
				}
			}
		}
	}]);
	//事件模块
	module.factory('detailCheck',function(){
		return{
			check: function(scope,data){
				console.log(data);
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
				var i;
				var tem = data.bookStatus;
				scope.detail = data;
				for(i=0;i<=2;i++){
					console.log(data);
					if(tem--<1)
						scope.scheduleClass[i] ='undo';
					else if(i==1){
						scope.scheduleClass[i] ='';
					}
						
				}
				if(data.businessEntrust.indexOf('注销抵押')>-1){
					scope.cancel = 'block';
						tem = data.cancelStatus;
						for(i=3;i<=4;i++)
							if(tem--<1)
								scope.scheduleClass[i] ='undo';
							else
								scope.scheduleClass[i] ='';
				}
				else
					scope.cancel = 'none';
				if(data.businessEntrust.indexOf('房产过户')>-1){
					scope.transfer = 'block';
						tem = data.transferStatus;
						for(i=5;i<=7;i++)
							if(tem--<=0)
								scope.scheduleClass[i] ='undo';
							else
								scope.scheduleClass[i] ='';
				}
				else
					scope.transfer = 'none';
				if(data.businessEntrust.indexOf('取新房产证')>-1){
					scope.hourse = 'block';
						tem = data.hourseStatus;
						for(i=8;i<=9;i++)
							if(tem--<1)
								scope.scheduleClass[i] ='undo';
							else
								scope.scheduleClass[i] ='';
				}
				else
					scope.hourse = 'none';
				if(data.businessEntrust.indexOf('贷款抵押')>-1){
					scope.loan = 'block';
						tem = data.loanStatus;
						for(i=10;i<=11;i++)
							if(tem--<1)
								scope.scheduleClass[i] ='undo';
							else
								scope.scheduleClass[i] ='';
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
					num:'=',
					clicks:'&',
					pngimage:'@',
					masktitle:'@'
				},
				template:   '<i class="weui_icon_circle"></i>'
							+'<div class="weui_cell schedule_cell">'
								+'<div class="weui_articel">'
									+'<section ng->'
										+"<p>{{scheduletext}}</p>"
									+'</section>'
								+'</div>'
								+'<div class="button_sp_area" ng-show="ifshow" ng-click="open()">'
							    	+'<a  class="weui_btn weui_btn_mini weui_btn_primary btn_status">查看凭证</a>'
								+'</div>'
							+'</div>'
							+'<div class="weui_dialog_alert" style="display:none;display:{{mask}};">'
								+'<div class="weui_mask" style="z-index:3;top:0;left:200%"></div>'
								+'<div class="weui_dialog" style="left:250%;top:20%">'
									+'<div class="weui_dialog_hd">'
										+"<strong class='weui_dialog_title' ng-bind='masktitle'></strong>"
									+'</div>'
									+'<div class="weui_dialog_bd">'
										+"<img src='{{pngimage}}' style='width:100%;text-align:center' alt='暂无数据'></img>"
									+'</div>'
									+'<div class="weui_dialog_ft">'
										+"<a ng-click='close()' class='weui_btn_dialog primary'>确定</a>"
									+'</div>'
								+'</div>'
							+'</div>',
				link:function(scope,elem,attr){
					scope.scheduletexts=['','预约取号','办理全权交接手续','《注销抵押》办理中','注销抵押完成','《过户》办理中','打印二手买卖合同','过户完成','《取新房产证》办理中','取新房产证办理完成','《代理抵押》办理中','贷款抵押完成'];
					scope.scheduletext = scope.scheduletexts[scope.num];
					scope.close = function(){
						scope.mask='none';
					}
					scope.open = function(){
						scope.mask='block';
					}
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
	module.directive('ngimage',function(){
		return{
			restrict:'E',
			replace:true,
			scope:{
				pngsrc:'@',
				bind:'='
			},
			template:'<img src={{pngsrc}} style="display:none;width:100%" alt="图片出错了" ng-bind="bind"></img>'
		}
	});
}()
