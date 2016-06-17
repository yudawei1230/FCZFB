module.directive('cell',function(){
 	return{
 		restrict:'AE',
 		replace:true,
 		transclude:true,
 		scope:{
 			title:'@',
 			model:'='
 		},
		template:	'<div class="weui_cell">'
		                +'<div class="weui_cell_hd">'
		                	+'<label class="weui_label infoLabel" ng-bind="title"></label>'
		            +'</div>'
		                +'<div class="weui_cell_bd weui_cell_primary">'
		                    +'<input class="weui_input" type="text" ng-model="model"/>'
		                +'</div>'
		            +'</div>',
        link:function(scope,elem,attr){
        }
 	}
 })
