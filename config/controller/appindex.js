var appindex = angular.module("app_index", []);
appindex.controller('appindexController', ['$scope', '$http', 'appindexModule', function ($scope, $http, appindexModule) {
    $scope.page ={
        pages:[{
            "version":1,
            "menu":{},
            "areas":[{
                "type": 0,
                "index": 1,
                "text":'广告'
            },{
                "type": 1,
                "index": 2,
                "text":'一级区域'
            },{
                "type": 2,
                "index": 3,
                "text":'二级区域'
            },{
                "type": 3,
                "index": 4,
                "text":'三级区域'
            }]
        }]
    };
    $scope.op =[{},{},{}];
    $scope.$watch('page',function(news,olds){
        console.log(news);
    })
}]);



