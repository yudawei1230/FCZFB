//业务进度指令
module.directive('artical',function(){
	return{
			restrict:'AE',
			scope:{
				clicks:'&',
				pngimage:'=',
				title:'=',
				schedule:'='
			},
			template:   '<i class="weui_icon_circle"></i>'
						+'<div class="weui_cell schedule_cell">'
							+'<div class="weui_articel">'
								+'<section>'
									+"<p <a ng-click='a()'>{{title}}</p>"
								+'</section>'
							+'</div>'
							+'<div class="button_sp_area" style="visibility:{{visibility}}" ng-click="open(pngimage)">'
						    	+'<a  class="weui_btn weui_btn_mini weui_btn_primary btn_status">查看凭证</a>'
							+'</div>'
						+'</div>'
						+'<div class="weui_dialog_alert" style="display:none;display:{{mask}};">'
							+'<div class="weui_mask"></div>'
							+'<div class="weui_dialog" style="top:200px;border-radius:10px">'
								+'<div class="weui_dialog_hd">'
									+"<strong class='weui_dialog_title'>凭证</strong>"
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
				if(scope.pngimage)
					scope.visibility = 'initial';
				else
					scope.visibility = 'hidden';
				if(scope.pngimage !=null)		
					scope.pngimage = '/api/xwdc'+ scope.pngimage;
				scope.close = function(){
					scope.mask='none';
				}
				scope.open = function(data){
					if(data!='')					
						scope.mask='block';
					else
						return;
				}
			}
	}
});
