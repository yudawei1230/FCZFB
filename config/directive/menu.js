appindex.directive('area1',function(){
	return{
		restrict:'E',
		scope:{
            block:'=',
            area:'=',
            choice:'='
		},
		template:   '<li><a><img src="{{block.icon}}"><p ng-bind="block.text"></p></a></li>',
        replace:true,
        link:function(scope,elem,attr){
            if(scope.block){
                if(!scope.block.icon)
                    scope.block.icon=''
                if(!scope.block.text)
                    scope.block.text ='请选择'
            }
            elem.find('a').blur(function(){
                elem[0].style.background = '#FFF';
            })
            elem.find('a').focus(function(){
                elem[0].style.background='rgba(213, 209, 209, 0.66)';
                scope.choice.type = scope.area.type;
                scope.choice.id = scope.block.id;
            })
           /* elem[0].onclick= function(){
                 elem[0].style.background='rgba(213, 209, 209, 0.66)';
                 scope.choice.type = scope.area.type;
                 scope.choice.id = scope.block.id;
                 console.log(scope.choice);
            }*/
        }
	}
});
