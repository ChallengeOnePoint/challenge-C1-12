'use strict';

angular.module('App', [
  'ngRoute',
  'ui.bootstrap',
])

.constant('constants', {
  'server': 'http://localhost:3000',
  'version': 0.1
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/views'});
}]);
