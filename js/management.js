!function(){
	var module = angular.module('myapp',[]);
	module.controller('myctrl',['$scope','init',function($scope,init){
		init.initAll($scope);

	}]);
	module.factory('init',['ajax',function(ajax){
		function initFn(scope){
			scope.getData = ajax.getData;
			scope.upload = function(that){
				ajax.upload(that);
			};
		}
		function initVa(scope){
			scope.orders = [];
			scope.input = {type:0};
			scope.types = [{id:0,name:'预约'},{id:1,name:'注销抵押'},{id:2,name:'过户'},{id:3,name:'取新房产证'},{id:4,name:'贷款抵押'}];
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
							scope.orders = [];
							var p = [];
							for(i in data.list){
								if(data.list[i].businessEntrust.split(',').length>1){
										num = data.list[i].businessEntrust.split(',');
										function type(){
											var item = num;
											var a = 0;
											var json ={};
											var tar = data.list[i];
									
											return function (){
												var type = num[a++];
												var schedule,scheduleVal;
												switch(type){
													case 1:schedule = 'cancelStatus';scheduleVal = tar.cancelStatus;break;
													case 2:schedule = 'transferStatus';scheduleVal = tar.transferStatus;break;
													case 3:schedule = 'hourseStatus';scheduleVal = tar.hourseStatus;break;
													case 4:schedule = 'loanStatus';scheduleVal = tar.loanStatus;break;
												}
												return {
													businessEntrust:type,
													personName:tar.personName,
													phoneNumber:tar.phoneNumber,
													uuid:tar.uuid,
													cancelStatus:tar.cancelStatus,
													transferStatus:tar.transferStatus,
													hourseStatus:tar.hourseStatus,
													loanStatus:tar.loanStatus,
													bookStatus:tar.bookStatus
												};
											}
										}
										var newtype = new type;
										for( j in num){
											scope.orders.push(newtype()) ;
										}
								}
								else
									scope.orders.push(data.list[i]);
							}
						}
					});
				}
				else
				$http.post('/api/xwdc/searchByOrderId',{"orderid":"74ed7af2a0ec"}).success(function(data){
					if(data.S0019){
						var type = data.businessEntrust.split(',');
						scope.orders = [];
						for( i in type){
							scope.orders.push(data);
							data.businessEntrust = type[i];
						}
					}
				})
			},
			upload:function(that){
				console.log(that);
				//console.log(scope);
/*				       var fd = new FormData();
				        //var file = document.querySelector('input[type=file]').files[0];
				        fd.append('nextName', 'bookStatus');  
				        fd.append('nextStatus',0);
				        fd.append('orderid', '74ed7af2a0ec');
			        	$http({
				            method:'POST',
				            url:"/api/xwdc/upload",
				            data: fd,
				            headers: {'Content-Type':undefined},
				            transformRequest: angular.identity 
			            }).success(function(data){
			            	if(data.S0023)
	                   			window.location.reload();
	                    }).error(function(error){
	                    	console.log(error);
	                    })*/
			},
			uploadFile:function(that){
						console.log(that);
				        //var file = document.querySelector('input[type=file]').files[0];
/*				        fd.append('nextName', 'bookStatus');  
				        fd.append('nextStatus', that.order.bookStatus+1);
				        fd.append('orderid', that.order.uuid);
			        	$http({
				            method:'POST',
				            url:"/api/xwdc/upload",
				            data: fd,
				            headers: {'Content-Type':undefined},
				            transformRequest: angular.identity 
			            }).success(function(data){
			            	if(data.S0023)
	                   			window.location.reload();
	                    }).error(function(error){
	                    	console.log(error);
	                    })*/
			}
		}
	}]);
	module.directive('order',function(){
		return{
			restrict:'A',
			scope:{
				order:'=',
				upload:'&'
			},
			template:
								"<td>{{order.uuid}}</td>"
								+"<td>{{order.personName}}</td>"
								+"<td>{{order.phoneNumber}}</td>"
								+"<td>{{book}}</td>"
								+"<td>{{type}}</td>"
								+"<td class='drCell'>"
									+"<div>"
										+"<p>状态</p>"
										+"<select ng-model = 'order.postdata.type' ng-options='book.name for book in bookSelect'>"
											+"<option value=''>请选择</option>"
										+"</select>"
									+"</div>"
									+"<div>"
										+"<p>进度</p>"
										+"<input ng-model = 'order.postdata.schedule' type='text'>"
									+"</div>"
									+"<div>"
										+"<p>附件</p>"
										+"<input class='btn btn-default' type='file'></input>"
									+"</div>"
									+"<a>详情</a>"		
								+"</td>"
								+"<td>"
									+"<input class='btn btn-default' ng-click='upload(this)' type='button' value='提交'></input>"
								+"</td>",
			link:function(scope,elem,attr){;
				scope.order.postdata ={};
				scope.bookSelect =[{id:1,name:'预约中'},{id:2,name:'处理中'},{id:3,name:'已完成'},{id:4,name:'已关闭'}];
				if(scope.order.businessEntrust==1){
					scope.type = '注销抵押';
				}
				if(scope.order.businessEntrust==2){
					scope.type = '房产过户';
				}
				if(scope.order.businessEntrust==3){
					scope.type = '取新房产证';
				}
				if(scope.order.businessEntrust==4){
					scope.type = '贷款抵押';
				}
				if(scope.order.bookStatus==0){
					scope.book = '未预约';
				}
				else if(scope.order.bookStatus==1){
					scope.book = '预约中';
				}
				else if(scope.order.bookStatus==2){
					scope.book = '预约中';
				}
				else{
					scope.book = '已预约';
				}

			}
		}
	});

}()