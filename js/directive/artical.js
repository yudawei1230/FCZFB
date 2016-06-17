//业务进度指令
module.directive('artical',function(){
	return{
			restrict:'AE',
			scope:{
				ifshow:'=',
				num:'=',
				clicks:'&',
				pngimage:'@',
				masktitle:'@',
				class:'@'
			},
			template:   '<i class="weui_icon_circle"></i>'
						+'<div class="weui_cell schedule_cell">'
							+'<div class="weui_articel">'
								+'<section>'
									+"<p>{{scheduletext}}</p>"
								+'</section>'
							+'</div>'
							+'<div class="button_sp_area" style="visibility:{{visibility}}" ng-click="open(pngimage)">'
						    	+'<a  class="weui_btn weui_btn_mini weui_btn_primary btn_status">查看凭证</a>'
							+'</div>'
						+'</div>'
						+'<div class="weui_dialog_alert" style="display:none;display:{{mask}};">'
							+'<div class="weui_mask"></div>'
							+'<div class="weui_dialog" style="top:45%;border-radius:10px">'
								+'<div class="weui_dialog_hd">'
									+"<strong class='weui_dialog_title' ng-bind='masktitle'></strong>"
								+'</div>'
								+'<div class="weui_dialog_bd">'
									+"<img src='{{pngimage}}' style='width:100%;text-align:center' alt='暂无数据'></img>"
								+'</div>'
								+'<div class="weui_dialog_ft">'
									+"<a ng-click='close()' class='weui_btn_dialog primary' style='background-color:rgba(255, 255, 255, 0.3);border-radius:10px'>确定</a>"
								+'</div>'
							+'</div>'
						+'</div>',
			link:function(scope,elem,attr){
				scope.scheduletexts=['','预约取号','办理全权交接手续','《注销抵押》办理中','注销抵押完成','《过户》办理中','打印二手买卖合同','过户完成','《取新房产证》办理中','取新房产证办理完成','《代理抵押》办理中','贷款抵押完成'];
				
				scope.scheduletext = scope.scheduletexts[scope.num];
				if(scope.ifshow)
					scope.visibility = 'initial';
				else
					scope.visibility = 'hidden';
				scope.close = function(){
					scope.mask='none';
				}
				if(scope.class)
				scope.open = function(data){
					if(data!='')					
						scope.mask='block';
					else
						return;
				}
			}
	}
});
