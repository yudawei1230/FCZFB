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
				scope.content='未预约';
			else if(scope.text==1)
				scope.content='预约中';
			else if(scope.text==2)
				scope.content='处理中';
			else if(scope.text==3)
				scope.content='已完成';
			else if(scope.text==4)
				scope.content='已关闭';
		}
	}
});