var module = angular.module('myApp',[]);
!function(){
	module.controller('myctrl',['$scope','init',function($scope,init){
		init.initAll($scope);
		$scope.parseUrl();
		//$scope.login();
	}]);
	module.factory('init',['ajax',function(ajax){
		function initFn(scope){
			scope.getData = ajax.getData;
			scope.upload = function(ownScope){
				ajax.upload(scope,ownScope);
			};
			scope.statuschange = function(ownScope){
				ajax.statuschange(scope,ownScope.order)
			}
			scope.parseUrl = function(){
				if(sessionStorage.getItem('input')){
					try{
						scope.input = JSON.parse(sessionStorage.getItem('input'));
						scope.getData(scope);
						console.log(scope.input)
					}catch(e){
						sessionStorage.removeItem('input');
					}
					
				}
			}
			scope.successAjax = function(){
				sessionStorage.setItem('input',JSON.stringify(scope.input));
				window.location.reload(); 
			}
			scope.login = function(){
				if(!sessionStorage.getItem('us'))
				{
					alert('请登录');
					window.location.href = '/login.html';
				}
			}
		}
		function initVa(scope){
			scope.orders = [];
			scope.input = {};
			scope.types = [{id:1,name:'注销抵押'},{id:2,name:'过户'},{id:3,name:'取新房产证'},{id:4,name:'贷款抵押'}];
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
				scope.orders = [];
				if(scope.input.businessEntrust)
					scope.input.businessEntrust = scope.input.businessEntrust.id;
				if(scope.input.username&&scope.input.username=='')
					delete scope.input.username;
				if(scope.input.orderTime){
					if(scope.input.orderTime=='null')
						delete scope.input.orderTime;
					if(!scope.input.endTime||scope.input.endTime ==null)
					{
						alert('选择结束时间');
						return;
					}
				}
				if(scope.input.endTime){
					if(scope.input.endTime=='null')
						delete scope.input.endTime;
					if(!scope.input.orderTime||scope.input.orderTime ==null)
					{
						alert('选择开始时间');
						return;
					}
				}	
				$http.post('/api/xwdc/searchOrder',scope.input).success(function(data){
					if(data.S0019){
						sessionStorage.setItem('input',JSON.stringify(scope.input));
						if(data.list[0].businessEntrust){
							data.list.forEach(function(item,index){
								scope.orders[index] = item.order;
							})
						}
						else
							scope.orders = data.list;
					}
					else if(data.E0021){
						alert('没有订单');
					}
						
				});
			},
			upload:function(scope,ownScope){
				       var fd = new FormData();
				        var file = document.getElementById('file'+ownScope.order.uuid).files[0];
				        fd.append('file', file);
				        fd.append('remark',ownScope.order.postdata.schedule);
				        fd.append('orderid', ownScope.order.uuid);
			        	$http({
				            method:'POST',
				            url:"/api/xwdc/upload",
				            data: fd,
				            headers: {'Content-Type':undefined},
				            transformRequest: angular.identity 
			            }).success(function(data){
			            	if(data.S0023)
	                   			scope.successAjax();
	                    }).error(function(error){
	                    	alert('上传出错');
	                    })
			},
			statuschange:function(scope,ownScope){
				$http.post('/api/xwdc/updateStatus',{'uuid':ownScope.uuid,'status':ownScope.Status}).success(function(data){
					if(data.S0023){
						scope.successAjax();
					}
				})
			}
		}
	}]);
	module.directive('order',function(){
		return{
			restrict:'A',
			scope:{
				order:'=',
				upload:'&',
				statuschange:'&'
			},
			template:
								"<td>{{order.uuid}}</td>"
								+"<td>{{order.personName}}</td>"
								+"<td>{{order.phoneNumber}}</td>"
								+"<td>{{type}}</td>"
								+"<td>{{book}}</td>"
								+"<td class='schedule'>"
									+"<p class='new'>{{new}}</p>"
									+"<p class='time'>{{time}}"
										+'<a  data-toggle="modal" data-target="#Detail{{order.uuid}}" style="cursor:pointer">详情</a>'
									+"</p>"
									
								+"</td>"
								+"<td>"
									+'<button type="button" class="btn btn-default" data-toggle="modal" data-target="#{{order.uuid}}">添加进度</button>'
								+"</td>"
								+"<td>"
									+"<div>"
										+"<select ng-model = 'order.postdata.type' ng-options='book.name for book in bookSelect'>"
											+"<option value=''>请选择</option>"
										+"</select>"
									+"</div>"
								+"</td>"
								+'<div class="modal fade" id={{order.uuid}} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
								  +'<div class="modal-dialog" role="document">'
								    +'<div class="modal-content">'
								      +'<div class="modal-header">'
								        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
								        +'<h4 class="modal-title" id="myModalLabel">进度操作</h4>'
								      +'</div>'
								      +'<div class="modal-body">'
											+'<div>'
												+'<p>进度</p>'
												+'<input ng-model = "order.postdata.schedule" type="text" style="width:90%">'
											+'</div>'
											+'<div>'
												+'<p>附件</p>'
												+'<input class="btn btn-default" type="file" id="file{{order.uuid}}" style="width:90%">'
											+'</div>'
								      +'</div>'
								      +'<div class="modal-footer">'
								        +'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'
								        +'<button type="button" class="btn btn-primary" ng-click="upload()">添加进度</button>'
								      +'</div>'
								    +'</div>'
								  +'</div>'
								+'</div>'
								+'<div class="modal fade" id="Detail{{order.uuid}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
								  +'<div class="modal-dialog" role="document">'
								    +'<div class="modal-content" style="text-align:center">'
								      +'<div class="modal-header">'
								        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
								        +'<h4 class="modal-title" id="myModalLabel" >订单详情</h4>'
								      +'</div>'
								      +'<div class="modal-body">'
								      	+'<embed src="{{iframeSrc}}" width="414" height="736"></embed>'
								      +'</div>'
								      +'<div class="modal-footer">'
								        +'<button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">取消</button>'
								      +'</div>'
								    +'</div>'
								  +'</div>'
								+'</div>'
								,
			link:function(scope,elem,attr){
				scope.iframeSrc = '/orderCheck.html?uuid=' + scope.order.uuid;
				scope.order.postdata ={};
				scope.type = '';
				scope.bookSelect =[{id:0,name:'未预约'},{id:1,name:'预约中'},{id:2,name:'处理中'},{id:3,name:'已完成'},{id:4,name:'已关闭'}];
				if(scope.order.orderBussiness[0].businessEntrust.indexOf('1')>-1){
					scope.type += '注销抵押,';
				}
				if(scope.order.orderBussiness[0].businessEntrust.indexOf('2')>-1){
					scope.type += '房产过户,';
				}
				if(scope.order.orderBussiness[0].businessEntrust.indexOf('3')>-1){
					scope.type += '取新房产证,';
				}
				if(scope.order.orderBussiness[0].businessEntrust.indexOf('4')>-1){
					scope.type += '贷款抵押,';
				}
				scope.type = scope.type.substr(0,scope.type.length-1);
				if(scope.order.status==0){
					scope.book = '未预约';
				}
				else if(scope.order.status==1){
					scope.book = '预约中';
				}
				else if(scope.order.status==2){
					scope.book = '处理中';
				}
				else if(scope.order.status==3){
					scope.book = '已完成';
				}
				else{
					scope.book = '已关闭';
				}
				if(scope.order.progress&&scope.order.progress.length>1){
					var index = scope.order.progress.length-1;
					scope.time = scope.order.progress[index].updateTime;
					if(scope.order.progress[index].remark==null)
						var remark = '无最新进度';
					else
						var remark = scope.order.progress[index].remark;
					scope.new = remark;
				}
				else{
					scope.new = '无最新进度';
				}
				scope.$watch('order.postdata.type',function(news,olds){
					if(news&&news.name!=scope.book){
						if(news.name =='未预约')
							scope.order.Status = 0;
						else if(news.name =='预约中')
							scope.order.Status = 1;
						else if(news.name =='处理中')
							scope.order.Status = 2;
						else if(news.name =='已完成')
							scope.order.Status = 3;
						else
							scope.order.Status = 4;
							scope.statuschange();
					}				
				});
			}
		}
	});

}()
