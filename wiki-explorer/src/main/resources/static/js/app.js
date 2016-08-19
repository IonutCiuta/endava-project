var app = angular.module('app', ['chart.js', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '../views/home.html',
            controller: 'homeController'
        })
        .when('/analysis', {
            templateUrl: '../views/analysis.html',
            controller: 'analysisController'
        })
});

app.controller('homeController', function($rootScope, $scope, $http) {
    $scope.articleTitle = undefined;

    $scope.getArticleAnalysis = function() {
        console.log("Input title is: " + $scope.articleTitle);

        $http.get("http://localhost:8080/article?titles=" + $scope.articleTitle)
            .then(function(response) {
                console.log("Analysis done!");
                $rootScope.data = [];
                $rootScope.labels = [];

                angular.forEach(response.data.topOccurrences, function(entry) {
                    $rootScope.data.push(entry.frequency);
                    $rootScope.labels.push(entry.word);
                });
            });
    }
});

app.controller('analysisController', function($rootScope) {
    console.log($rootScope.labels);
    console.log($rootScope.data);
});

app.controller('formController', function($scope) {

    // we will store our form data in this object
    $scope.formData = {};
    console.log($scope.formData);

});