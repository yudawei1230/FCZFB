module.directive('formtext',function(){
	return{
		restrict:'E',
		scope:{
			data:'@',
			ngClick:'&'
		},
		template:   '<div class="bd spacing" ng-click="submits()">'
			    		+'<a class="weui_btn weui_btn_primary next" style="margin-top:20%">提交</a>'
					+'</div>'
					+'<div class="weui_dialog_alert" style="display: none;display:{{ifshow}}">'
					    +'<div class="weui_mask"></div>'
					       +'<div class="weui_dialog">'
					            +'<div class="weui_dialog_hd"><strong class="weui_dialog_title">订单信息错误</strong></div>'
					            +'<div class="weui_dialog_bd" ng-bind="msgerror"></div>'
					            +'<div class="weui_dialog_ft">'
					                +'<a class="weui_btn_dialog primary">确定</a>'
					            +'</div>'
				        	+'</div>'
				   		+'</div>'
		   			+'</div>'
		   			,
		   			link:function(scope,elem,attr){
		   				scope.validate = function(data){
		   					if(!data.personName){
		   					}
		   					return false;
		   				}
		   				scope.submits = function(){
		   					if(scope.validate(scope.data))
		   						scope.ngClick();
		   					else
		   						return;
		   				}
		   			}
	}
})