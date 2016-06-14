
	//声明模块
	var module = angular.module('myapp',[]);
	//滑动组件
	var mySwiper = new Swiper('.swiper-container', {
	        direction: 'horizontal',
	        onlyExternal : true
	});
	//控制器
	module.controller('myctrl',['$scope','moduleFunction','moduleDeclaration',function($scope,moduleFunction,moduleDeclaration){
		moduleDeclaration.init($scope);
		moduleFunction.init($scope);
	}]);
	//声明初始化模块
	module.factory('moduleDeclaration',function(){
		function initInput(scope){
			scope.inputs={
					place:'请选择',
					type:'请选择',
					businessEntrust:[]
				};
		}
		function initPage(scope){
			scope.page = 0;
		}
		return{
			init:function(scope){
					initInput(scope);
					initInput(scope);
				},
			initInput:function(scope){
				initInput(scope);
			},
			initPage:function(scope){
				initPage(scope);
			}
		}
	});
	//事件模块
	module.factory('infoInput',function(){
		function choiceIsEmpty(json){
			for(var i in json)
				if(json[i])
					return true
			return false;
		}
		function choiceRemember(json,scope){
			for(var i in json)
					if(json[i])
						if(i =='cancel')
							scope.inputs.businessEntrust.push(1);
						else if(i == 'transfer')
							scope.inputs.businessEntrust.push(2);
						else if(i == 'get')
							scope.inputs.businessEntrust.push(3);
						else
							scope.inputs.businessEntrust.push(4);
		}					
		return{
			judge: function(json,scope){
				if(choiceIsEmpty(json))
				{
					choiceRemember(json,scope);
					scope.inputs.certificateType=1;
					scope.formEntrust = "全权委托";
					if(json.transfer){	
						scope.inputs.sellerCertificateType=1;
						mySwiper.slideTo(2, 200, false);
					}		
					else
						mySwiper.slideTo(1, 200, false);
					window.scroll(0,0);
				}
			}
		}
	});
	module.factory('ngAjax',['$http',function($http){
		var data={
					"personName":"张三",
					"phoneNumber": "18888888888",
					"certificateType":"1",
					"certificateNo":"123456789123456789",
					
					"sellerName":"李四",
					"sellerPhoneNumber": "17777777777",
					"sellerCertificateType":"1",
					"sellerCertificateNo":"123456789123456789",
					
					"houseAddress":"深圳市",
					"houseName": "AAA",
					"ownershipType":"bbb",
					"ownershipNo":"123456",
					
					"businessEntrust":"1,2,3,4",
					"formEntrust": "全权委托"
				}
		return{
			post:function(scope){
				console.log(scope.inputs);
				$http.post('/orderSubmit',scope.inputs).success(function(data,header,config,status){
					console.log(data);

				}).error(function(data,header,config,status){
					console.log(data);
				});
			}
		}
	}]);
	//事件初始化模块
	module.factory('moduleFunction',['infoInput','moduleDeclaration','ngAjax',function(infoInput,moduleDeclaration,ngAjax){
		return{
			init:function(scope){
					scope.infoInput= function(data){
						console.log(data);
					infoInput.judge(data,this);	
					}
					scope.backToChoose = function(){
						moduleDeclaration.initInput(scope);
						mySwiper.slideTo(0, 200, false);
						window.scroll(0,0);
					}
					scope.choosePlace = function(index){
						scope.page = index;
						mySwiper.slideTo(3, 200, false);
						window.scroll(0,0);
					}
					scope.placeChose = function(place){
						scope.inputs.place = place;
						mySwiper.slideTo(scope.page, 200, false);
						window.scroll(0,0);
					}
					scope.chooseType = function(index){
						scope.page = index;
						mySwiper.slideTo(4, 200, false);
						window.scroll(0,0);
					}
					scope.typeChose = function(type){
						scope.inputs.type = type;
						mySwiper.slideTo(scope.page, 200, false);
						window.scroll(0,0);
					}
					scope.submit = function(data){
						ngAjax.post(scope);
					}
			}
		}
	}]);

