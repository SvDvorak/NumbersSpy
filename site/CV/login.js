angular.module("LoginApp", [])

.controller("LoginCtrl", function($scope, $http) {
    $scope.name = "john.quiller";
    $scope.pass = "";
    $scope.incorrectLogin = false;

    $scope.login = function() {
        $scope.makeRequest();
    };

    $scope.makeRequest = function() {
        var data = {
            name: $scope.name,
            pass: $scope.pass
        };
        $http.post("http://localhost:3100/service/login", data)
        .success((data, status, headers, config) => {
            $scope.incorrectLogin = false;
            window.location.replace(data);
        })
        .error((data, status, headers, config) => {
            $scope.incorrectLogin = true;
        });
    };
});