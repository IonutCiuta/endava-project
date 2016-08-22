var app = angular.module('app', ['chart.js', 'ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../views/home.html',
                controller: 'homeController'
            });
    }]);

app.controller('homeController', function ($rootScope, $scope, $http) {
    $scope.getArticleAnalysis = function () {
        if ($scope.inputTitle) {
            $rootScope.articleTitle = $scope.inputTitle;
        }

        console.log("Input title is: " + $rootScope.articleTitle);

        $http.get("http://localhost:8080/article?titles=" + $rootScope.articleTitle)
            .then(function (response) {
                console.log("Analysis done!");
                $rootScope.data = [];
                $rootScope.labels = [];
                $rootScope.analysisTime=response.data.analysisTime;
                console.log(response.data.topOccurrences);
                angular.forEach(response.data.topOccurrences, function (entry) {
                    $rootScope.data.push(entry.frequency);
                    $rootScope.labels.push(entry.word);
                    console.log($rootScope.data);
                });
                $rootScope.articleTitle = response.data.articleTitle;
                window.scrollTo(0,10000);
            });
    };

    $scope.getRandomArticleAnalysis = function () {
        console.log("Getting Random Article");

        $http.get("http://localhost:8080/article/random")
            .then(function (response) {
                console.log("Analysis done!");
                $rootScope.data = [];
                $rootScope.labels = [];
                $rootScope.analysisTime=response.data.analysisTime;
                angular.forEach(response.data.topOccurrences, function (entry) {
                        $rootScope.data.push(entry.frequency);
                        $rootScope.labels.push(entry.word);
                    }
                );
                $rootScope.articleTitle = response.data.articleTitle;
                window.scrollTo(0,10000);
            });
    };
    $scope.showContent = function ($fileContent) {
        $rootScope.articleTitle = $fileContent;
        // $scope.articleTitle.replace(' ','|');
        // $scope.articleTitle.replace('\n','|');

        console.log("Input title is: " + $scope.articleTitle);
        $http.get("http://localhost:8080/article?titles=" + $rootScope.articleTitle)
            .then(function (response) {
                console.log("Analysis done!");
                $rootScope.data = [];
                $rootScope.labels = [];
                $rootScope.analysisTime=response.data.analysisTime;
                angular.forEach(response.data.topOccurrences, function (entry) {
                    $rootScope.data.push(entry.frequency);
                    $rootScope.labels.push(entry.word);
                });
                $rootScope.articleTitle = response.data.articleTitle;
                window.scrollTo(0,10000);
            });
    };
});

app.controller('checkBoxController', function ($scope) {

    // we will store our form data in this object
    $scope.formData = {};
    WikiContentAnalyzer.setIgnoreCommon($scope.formData.ignoreCommon.valueOf());
    console.log($scope.formData.ignoreCommon.valueOf());

});


app.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function (onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function (onLoadEvent) {
                    scope.$apply(function () {
                        fn(scope, {$fileContent: onLoadEvent.target.result});
                    });
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});
