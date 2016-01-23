app.controller('HomeCtrl', function($scope,$http) {

  $http.get('api/carnets').
    success(function(data, status, headers, config) {
      $scope.adresses = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });

});

