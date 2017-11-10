angular.module("ExtractionApp", [ 'ngAnimate' ])

.controller("ExtractionCtrl", function($scope, $http) {
    $scope.hasChosen = false;
    $scope.hasRetrievedData = false;

    $scope.makeChoice = function(choice) {
        $http.post("/service/makeChoice", { choice: choice })
        .then((response) => {
            $scope.hasChosen = response.data.hasChosen;
            document.getElementById('response').innerHTML = response.data.response;
        })
        .catch((error) => {
            console.log(error);
        });
    };

    $scope.getSelectedChoice = function() {
        $http.get("/service/selectedChoice")
        .then((response) => {
            $scope.hasChosen = response.data.hasChosen;
            document.getElementById('response').innerHTML = response.data.response;
            $scope.hasRetrievedData = true;
        })
        .catch((error) => {
            console.log(error);
        });
    };

    $scope.getSelectedChoice();
});