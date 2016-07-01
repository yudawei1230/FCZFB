module.directive('article',function(){
	return{
		restrict:'AE',
		scope:{
			personname:'@',
			businessentrust:'=',
			ordernum:'@'
		},
		template:   '<p ng-bind="num"></p>'
					+'<p ng-bind="name"></p>'			
					+'<p ng-bind="type"></p>',
		link:function(scope,elem,attr){					
			if(scope.ordernum)
				scope.num = '订单号： '+scope.ordernum;
			if(scope.personname)
			{
				scope.personname='预约人姓名： '+scope.personname;
				scope.name = scope.personname;
			}
			if(scope.businessentrust){
				scope.businessentrust.forEach(function(item,index){
					if(index==0)
						scope.type='业务类型： ';
					if(item.businessEntrust==1)
						scope.type += '注销抵押,';
					else if(item.businessEntrust==2)
						scope.type += '房产过户,';
					else if(item.businessEntrust==3)
						scope.type += '取新房产证,';
					else
						scope.type += '贷款抵押,';
				});
				scope.type =scope.type.slice(0,scope.type.length-1);
			}
			
		}
	}
});