'use strict';

angular.module('App.views.carnets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/carnets', {
    templateUrl: 'views/carnets/carnets.html',
    controller: 'carnetsCtrl'
  });
}])

.factory('carnetsService', function($http, constants) {

     var url = constants.server + "/carnets";

     return {
        get : function() {
            return $http.get(url);
        },
        add : function(carnet) {
            return $http.post(url, carnet);
        },
        delete : function(id) {
            return $http.delete(url + '/' + id);
        }
    };

})

.controller('carnetsCtrl', function($scope, constants, carnetsService) {

    $scope.carnets = [];
    $scope.addLabel = '+';

    carnetsService.get()
        .success(function(data) {
            $scope.carnets = data;
    });

    this.addcarnet = function() {
        if ($scope.carnet.name != undefined) {
            carnetsService.add($scope.carnet)
                .success(function(list) {
                    $scope.carnet = {};
                    $scope.carnets = list;
                });
        }
    };

    this.deletecarnet = function(id) {
        carnetsService.delete(id)
            .success(function(list) {
                $scope.carnets = list;
            });
    };

});
