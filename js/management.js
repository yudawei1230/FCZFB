var module = angular.module('myApp',[]);
!function(){
	module.controller('myctrl',['$scope','init',function($scope,init){
		init.initAll($scope);
		$scope.parseUrl();
	}]);
	module.factory('init',['ajax',function(ajax){
		function initFn(scope){
			scope.getData = ajax.getData;
			scope.upload = function(ownScope){
				ajax.upload(ownScope);
			};
			scope.onFileSelect = function($files) { 
			 	console.log($files);
			}
			scope.statuschange = function(ownScope){
				ajax.statuschange(scope,ownScope.order)
			}
			scope.parseUrl = function(){
				if(window.location.href.indexOf('?')==-1)
					return;
				var a = window.location.href.split('?')[1].split('&')[0].split('=');
				var json = {};
				for(var i=0;i<a.length;i++)
				{
				    json[a[i]]=a[++i];
				}
				scope.input = json;
				scope.getData(scope);
			}
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
						if(data.S0019)
							scope.orders = data.list;
						else if(data.E0021)
							alert('没有订单');
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
					else if(data.E0021)
						alert('没有订单');
				})
			},
			upload:function(ownScope){
				console.log(ownScope);
				       var fd = new FormData();
				        var file = document.getElementById(ownScope.order.uuid).files[0];
				        fd.append('file', file);
				        fd.append('nextName', 'schedule');  
				        fd.append('schedule',ownScope.order.postdata.schedule);
				        fd.append('orderid', ownScope.order.uuid);
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
			statuschange:function(scope,ownScope){
				$http.post('/statuschange',{'orderid':ownScope.uuid,'Status':ownScope.Status}).success(function(data){
					if(data.E0019){
						var href ='?'
						for(i in scope.input){
							if(scope.input[i]&&i!='type')
							href += i+'='+scope.input[i]+'&';
						}
						href = href.substr(0,href.length-1);
						window.location.href =href; 
					}
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
								+"<td>"
									+"<p ng-bind='new'></p>"
									+"<a>详情</a>"
								+"</td>"
								+"<td>"
									+'<button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal">添加进度</button>'
								+"</td>"
								+"<td>"
									+"<div>"
										+"<select ng-model = 'order.postdata.type' ng-options='book.name for book in bookSelect'>"
											+"<option value=''>请选择</option>"
										+"</select>"
									+"</div>"
								+"</td>"
								+'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
								  +'<div class="modal-dialog" role="document">'
								    +'<div class="modal-content">'
								      +'<div class="modal-header">'
								        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
								        +'<h4 class="modal-title" id="myModalLabel">进度操作</h4>'
								      +'</div>'
								      +'<div class="modal-body">'
											+'<div>'
												+'<p>进度</p>'
												+'<input ng-model = "order.postdata.schedule" type="text">'
											+'</div>'
											+'<div>'
												+'<p>附件</p>'
												+'<input class="btn btn-default" type="file" id="{{order.uuid}}">'
											+'</div>'
								      +'</div>'
								      +'<div class="modal-footer">'
								        +'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'
								        +'<button type="button" class="btn btn-primary" ng-click="upload(this)">添加进度</button>'
								      +'</div>'
								    +'</div>'
								  +'</div>'
								+'</div>',
			link:function(scope,elem,attr){
				scope.order.postdata ={};
				scope.type = '';
				scope.bookSelect =[{id:0,name:'未预约'},{id:1,name:'预约中'},{id:2,name:'处理中'},{id:3,name:'已完成'},{id:4,name:'已关闭'}];
				if(scope.order.businessEntrust.indexOf('1')>-1){
					scope.type += '注销抵押,';
				}
				if(scope.order.businessEntrust.indexOf('2')>-1){
					scope.type += '房产过户,';
				}
				if(scope.order.businessEntrust.indexOf('3')>-1){
					scope.type += '取新房产证,';
				}
				if(scope.order.businessEntrust.indexOf('4')>-1){
					scope.type += '贷款抵押,';
				}
				scope.type = scope.type.substr(0,scope.type.length-1);
				if(scope.order.Status==0){
					scope.book = '未预约';
				}
				else if(scope.order.Status==1){
					scope.book = '预约中';
				}
				else if(scope.order.Status==2){
					scope.book = '处理中';
				}
				else if(scope.order.Status==3){
					scope.book = '已完成';
				}
				else{
					scope.book = '已关闭';
				}
				if(scope.schedule){

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
