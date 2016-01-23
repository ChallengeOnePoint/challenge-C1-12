app.controller('HomeCtrl', function($scope,$http) {

  $http.get('api/carnets').
    success(function(data, status, headers, config) {
      $scope.adresses = data;
      console.log($scope.adresses);
    }).
    error(function(data, status, headers, config) {
      // log error
    });

});

