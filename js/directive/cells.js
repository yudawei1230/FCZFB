module.directive('cells',function(){
	return{
		restrict:'AE',
		replace:true,
		transclude:true,
		scope:{
			click:'&',
			bind:'=',
			title:'@'
		},
		template:	'<div class="weui_cells weui_cells_access" ng-click="click()">'
			            +'<a class="weui_cell">'
			                +'<div class="weui_cell_bd weui_cell_primary">'
			                    +'<p ng-bind="title"></p>'
			                +'</div>'
			                +'<div class="weui_cell_ft" ng-bind="bind">请选择</div>'
			            +'</a>'
		        	+'</div>',
	}
})

