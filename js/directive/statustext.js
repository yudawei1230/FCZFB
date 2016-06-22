module.directive('statustext',function(){
	return{
		restrict:'AE',
		scope:{
			text:'@'
		},
		template:'<p ng-bind="content"></p>',
		replace:true,
		link:function(scope,elem,attr){
			if(scope.text==0)
				scope.content='待确认';
			else if(scope.text==1)
				scope.content='办理中';
			else
				scope.content='已完成';
		}
	}
});