module.directive('article',function(){
	return{
		restrict:'AE',
		scope:{
			personname:'@',
			businessentrust:'@',
			ordernum:'@'
		},
		template:   '<p ng-bind="num"></p>'
					+'<p ng-bind="name"></p>'			
					+'<p ng-bind="type"></p>',
		link:function(scope,elem,attr){					
			if(scope.ordernum)
			{
				scope.ordernum = '订单号： '+scope.ordernum;
				scope.num = scope.ordernum;
			}
			if(scope.personname)
			{
				scope.personname='预约人姓名： '+scope.personname;
				scope.name = scope.personname;
			}
			if(scope.businessentrust){
				scope.businessentrust.split(',').forEach(function(item,index){
					if(index==0)
						scope.businessentrust='业务类型： ';
					if(item==1)
						scope.businessentrust += '注销抵押,';
					else if(item==2)
						scope.businessentrust += '房产过户,';
					else if(item==3)
						scope.businessentrust += '取新房产证,';
					else
						scope.businessentrust += '贷款抵押,';
				});
				scope.businessentrust =scope.businessentrust.slice(0,scope.businessentrust.length-1);
				scope.type = scope.businessentrust;
			}
			
		}
	}
});