!function(){
	var module = angular.module('myapp',[]);
	module.controller('myctrl',['$scope','init',function($scope,init){
		init.initAll($scope);
	}]);
	module.factory('init',['ajax',function(ajax){
		function initFn(scope){
			scope.getData = ajax.getData;
		}
		function initVa(scope){
			scope.orders = [];
			scope.input = {};
		}
		return{
			initAll:function(scope){
				initVa(scope);
				initFn(scope);
			}
		}
	}]);
	module.factory('ajax',['$http',function($http){
		return{
			getData:function(scope){
				if(scope.input.phone){
					$http.post('/api/xwdc/searchByUserName',{username:scope.input.phone}).success(function(data){
						if(data.S0019){
							scope.orders = data.list;
							console.log(data);
						}
					});
				}
				else
				$http.post('/api/xwdc/searchByOrderId',{"orderid":"74ed7af2a0ec"}).success(function(data){
					if(data.S0019){
						scope.orders = [data];
					}
				});
			}
		}
	}]);
	module.directive('order',function(){
		return{
			restrict:'A',
			scope:{
				order:'@'
			},
			template:
							"<td>{{orders.uuid}}</td>"
							+"<td>{{orders.personName}}</td>"
							+"<td>{{orders.phoneNumber}}</td>"
							+"<td>{{orders.businessEntrust}}</td>"
							+"<td>{{orders.bookStatus}}</td>"
							+"<td>"
								+"<input class='btn btn-default' ng-click='click()' type='file'></input>"
							+"</td>",
			link:function(scope,elem,attr){
				scope.orders = JSON.parse(scope.order);
				scope.click = function(){
				}
			}
		}
	});

}()