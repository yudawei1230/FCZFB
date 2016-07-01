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
						if(item.uuid == num)
							detailCheck.check(scope,item);
					});
				}
				scope.urlParse=function(){
					var url = window.location.href;
					if(url.indexOf('+')>-1)
					{
						scope.iframe = false;
						url = url.substr(0,url.length-1);
					}
					else
						scope.iframe = true;
					if(url.indexOf('?uuid=')>-1)
						scope.dataCheck(scope.details,url.split('?uuid=')[1]);
					else 
						return;
				}
				scope.ajax = function(){
					$http.post('/api/xwdc/searchOrder',{username:'13580503220'}).success(function(data){
						data.list.forEach(function(item,index){
							data.list[index].progress.splice(0,1);
						})
						if(data.S0019){
							scope.details=data.list;
							scope.urlParse();
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
				scope.detail.orderBussiness.forEach(function(item,index){
						if(index==0)
							scope.detail.businessEntrust='';
						if(item.businessEntrust==1)
							scope.detail.businessEntrust += '注销抵押,';
						else if(item.businessEntrust==2)
							scope.detail.businessEntrust += '房产过户,';
						else if(item.businessEntrust==3)
							scope.detail.businessEntrust += '取新房产证,';
						else
							scope.detail.businessEntrust += '贷款抵押,';
					});
				scope.detail.businessEntrust =scope.detail.businessEntrust.slice(0,scope.detail.businessEntrust.length-1);
				mySwiper.slideNext();
				window.scrollTo(0,0);
			},
			scheduleCheck:function(scope,data){
				mySwiper.slideNext();
				window.scrollTo(0,0);
			}
		}
	
	});

}()
