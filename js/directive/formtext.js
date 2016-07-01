module.directive('formtext',function(){
	return{
		restrict:'E',
		scope:{
			data:'@',
			clicks:'&',
			backclick:'&',
			type:'@'
		},
		template:   '<div class="bd spacing">'
			    		+'<a class="weui_btn weui_btn_primary next" style="margin-top:{{buttonStyle}}" ng-click="submits()">提交</a>'
					+'</div>'
			    	+'<div class="bd spacing" ng-click="backclick()">'
			    		+'<a class="weui_btn weui_btn_primary next" style="margin-top:5%">返回</a>'
					+'</div>'
					+'<div class="weui_dialog_alert" style="display: none;display:{{ifshow}}">'
					    +'<div class="weui_mask" style="{{maskStyle}}"></div>'
					       +'<div class="weui_dialog" style="{{dialogStyle}}">'
					            +'<div class="weui_dialog_hd"><strong class="weui_dialog_title" ng-bind="error"></strong></div>'
					            +'<div class="weui_dialog_bd" ng-bind="msgerror"></div>'
					            +'<div class="weui_dialog_ft">'
					                +'<a class="weui_btn_dialog primary" ng-click="hide()">确定</a>'
					            +'</div>'
				        	+'</div>'
				   		+'</div>'
		   			+'</div>'
		   			,
		link:function(scope,elem,attr){
			if(scope.type =='FGH'){
				scope.buttonStyle = '20%';
				scope.maskStyle="left:100%;top:0%";
				scope.dialogStyle='left:150%;top:200px';
				scope.num = 0;
			}else{
				scope.buttonStyle = '10%';
				scope.maskStyle="left:200%;top:0%";
				scope.dialogStyle='left:250%;top:200px';
				scope.num = 1;
			}
			scope.validate = function(data){
				var text = [{
					"personName":"预约人姓名",
					"phoneNumber": "手机号码",
					"certificateNo":"身份证号码",
					"houseAddress":"房地产所在地",
					"houseName": "房地产名称",
					"ownershipType":"权属证明类型",
					"ownershipNo":"权属证明编号"
				},{
					"personName":"买方姓名",
					"phoneNumber": "买方手机号码",
					"certificateNo":"买方身份证号码",
					"sellerName":"卖方姓名",
					"sellerPhoneNumber": "卖方手机号码",
					"sellerCertificateNo":"卖方身份证号码",
					"houseAddress":"房地产所在地",
					"houseName": "房地产名称",
					"ownershipType":"权属证明类型",
					"ownershipNo":"权属证明编号"
				}];
				for(i in text[scope.num]){
					if(data[i]&&data[i]!=''){
						if(data[i]=='请选择'){
							scope.error = '请选择'+text[scope.num][i];
							return false;
						}
					}else{
							scope.error = '请选择'+text[scope.num][i];
							return false;
					}
				}
				return true;
			}
			scope.submits = function(){
				if(scope.validate(JSON.parse(scope.data)))
					scope.clicks();
				else
					scope.ifshow = 'block';
			}
			scope.hide = function(){
				scope.ifshow = 'none';
			}
		}
	}
})