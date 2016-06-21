	var mySwiper = new Swiper('.swiper-container', { 
	        direction: 'horizontal',
	        onlyExternal : true
	});
	var module = angular.module('myapp',[]);
!function(){
	var i =0;
	module.controller('myctrl',['$scope','moduleFunction','moduleDeclaration',function($scope,moduleFunction,moduleDeclaration){
		//变量声明初始化
		moduleDeclaration.init($scope);
		//事件初始化
		moduleFunction.init($scope);
		//解析字符串
		$scope.urlParse();
		$scope.ajax();
	}]);
	//变量模块
	module.factory('moduleDeclaration',function(){
		return{
			init:function(scope){
				scope.details=[];
				scope.scheduleClass=[];
				scope.mask = 'none';
			}
		}
	})
	//事件初始模块
	module.factory('moduleFunction',['detailCheck','$http',function(detailCheck,$http){
		return{
			init:function(scope){
				scope.orderDetail = function(data){
					detailCheck.check(scope,data.detail);
				};
				scope.scheduleCheck = function(data){
					detailCheck.scheduleCheck(scope,data.detail);
				};
				scope.back=function(){
					mySwiper.slidePrev();
					window.scrollTo(0,0);
				};
				scope.dataCheck = function(array,num){
					array.forEach(function(item,index){
						if(item.orderNum == num)
							detailCheck.check(scope,item);
					});
				}
				scope.urlParse=function(){
					var url = window.location.href;
					var orderNum;
					if(url.indexOf('?orderNum=')>-1)
						scope.dataCheck(data,url.split('?orderNum=')[1]);
					else 
						return;
				}
				scope.hight = function(){
					console.log(window.client.height);
				}
				scope.ajax = function(){
					$http.post('/api/xwdc/searchByUserName',{username:'13580503220'}).success(function(data){
						if(data.S0019){
							scope.details=data.list;
							console.log(data);
						}
					})
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
				var i;
				var tem = data.bookStatus;
				console.log(data);
				scope.detail = data;
				for(i=0;i<=2;i++){
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

}()
