appindex.factory('appindexModule', function () {
    return {
        init: {
            ajax: function ($scope, $http) {
                $http.post('/config/data/package.json', {}).success(
                    function (data) {
                        if (data) {
                            console.log(data);
                        }
                    });
            }


        }
    }


});
