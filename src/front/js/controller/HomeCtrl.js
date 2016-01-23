document.getElementById('file-input').addEventListener('change', readFile, false);
var inputFromFile;
function readFile(evt) {
  var files = evt.target.files;
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function() {
    inputFromFile = this.result;
  }
  reader.readAsText(file)
}


app.controller('HomeCtrl', function($scope, $http) {

  $scope.title = "Carnet d'adresses";
  $http.get('api/carnets').
  success(function(data, status, headers, config) {
    $scope.adresses = data;
    console.log($scope.adresses);
  }).
  error(function(data, status, headers, config) {
    // log error
  });





});
