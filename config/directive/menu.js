appindex.directive('area1',function(){
	return{
		restrict:'E',
		scope:{
            block:'=',
            area:'=',
            choice:'=',
            index:'@'
		},
		template:   '<li ondrop="drop(event,{{area.type}},{{block.id}},{{index}})"><a><img src="images/角标@2x.png" class="newPng" ng-show="pngshow"><img src="{{block.icon}}"><p ng-bind="block.text"></p></a></li>',
        replace:true,
        link:function(scope,elem,attr){
            if(scope.area.type==3)
                scope.pngshow = true;
            else
                scope.pngshow = false;
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
                if(scope.index!=='false')
                    scope.choice.index = scope.index;
            })
        }
	}
});

