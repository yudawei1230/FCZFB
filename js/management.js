!function(){
	var module = angular.module('myapp',[]);
	module.controller('myctrl',['$scope','init',function($scope,init){
		init.initAll($scope);

	}]);
	module.factory('init',['ajax',function(ajax){
		function initFn(scope){
			scope.getData = ajax.getData;
			scope.uploadbook = ajax.uploadBook;
			//scope.uploadbook();

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
			uploadBook:function(that){
				       var fd = new FormData();
				        //var file = document.querySelector('input[type=file]').files[0];
				        fd.append('nextName', 'bookStatus');  
				        fd.append('nextStatus', 0);
				        fd.append('orderid', '677a5c69c4b0');
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
	                    })
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
				order:'@',
				uploadbook:'&'
			},
			template:
								"<td>{{orders.uuid}}</td>"
								+"<td>{{orders.personName}}</td>"
								+"<td>{{orders.phoneNumber}}</td>"
								+"<td>{{book}}</td>"
								+"<td>{{type}}</td>"
								+"<td>{{status}}</td>"
								+"<td>"
									+"<input class='btn btn-default' ng-click='click(this)' type='button' value='{{buttontext}}' style = 'display:{{buttonshow}}'></input>"
									+"<p ng-bind='upload' style='display:{{uploadshow}}'><p>"
									+"<input class='btn btn-default' ng-click='click()' type='file'  style='display:{{uploadshow}}'></input>"
								+"</td>",
			link:function(scope,elem,attr){
				scope.orders = JSON.parse(scope.order);
				scope.type = '';
				scope.uploadshow = 'none !important';
				scope.buttonshow = 'none !important';
				if(scope.orders.businessEntrust==1){
					scope.type += '注销抵押';
					if(scope.orders.cancelStatus==0){
						scope.status = '未办理';
						scope.buttontext = '办理注销抵押';
					}	
					if(scope.orders.cancelStatus==1){
						scope.status = '办理中';
						scope.upload = '上传注销抵押凭证';
					}
					if(scope.orders.cancelStatus==2)
						scope.status = '注销抵押完成';
				}
				if(scope.orders.businessEntrust==2){
					scope.type += '房产过户';
					if(scope.orders.transferStatus==0){
						scope.status = '未办理';
						scope.buttontext = '办理房产过户';
					}
					if(scope.orders.transferStatus==1){
						scope.status = '办理中';
						scope.upload = '上传二手买卖凭证';
					}
					if(scope.orders.transferStatus==2){
						scope.status = '打印二手买卖合同';
						scope.upload = '上传过户凭证';
					}
					if(scope.orders.transferStatus==3)
						scope.status = '过户完成';
				}
				if(scope.orders.businessEntrust==3){
					scope.type += '取新房产证';
					if(scope.orders.hourseStatus==0){
						scope.buttontext = '办理取新房产证';
						scope.status = '未办理';
					}
					if(scope.orders.hourseStatus==1){
						scope.status = '办理中';
						scope.upload = '上传取新房产证凭证';
					}
						
					if(scope.orders.hourseStatus==2)
						scope.status = '取新房产证完成';
				}
				if(scope.orders.businessEntrust==4){
					scope.type += '贷款抵押';
					if(scope.orders.loanStatus==0){
						scope.buttontext = '办理贷款抵押';
						scope.status = '未办理';
					}
					if(scope.orders.loanStatus==1){
						scope.status = '办理中';
						scope.upload = '上传贷款抵押';
					}	
					if(scope.orders.loanStatus==2)
						scope.status = '贷款抵押完成';
				}
				if(scope.orders.bookStatus==0){
					scope.book = '未预约';
					scope.buttontext = '电话预约';
					scope.buttonshow = 'inline-block !important';
					scope.click = scope.uploadbook;
				}
				else if(scope.orders.bookStatus==1){
					scope.click = 
					scope.book = '预约中';
					scope.upload = '预约取号';
					scope.uploadshow = 'inline-block !important';
				}
				else if(scope.orders.bookStatus==2){
					scope.book = '预约中';
					scope.upload = '办理全权交接';
					scope.uploadshow = 'inline-block !important';
				}
				else{
					scope.book = '已预约';
				}

				if(scope.buttontext&&scope.buttontext!=''&&scope.orders.bookStatu>2)
					scope.buttonshow = 'inline-block !important';
				if(scope.upload&&scope.upload!=''&&scope.orders.bookStatu>2)
					scope.uploadshow = 'inline-block !important';
			}
		}
	});

}()