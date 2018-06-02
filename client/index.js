angular.module('weightTrackerApp', ['ngRoute', 'chart.js'])
    .config(function ($routeProvider, ChartJsProvider) {
        $routeProvider
            .when('/list', {
                'template': "<list-weights></list-weights>",
                'activeTab': 'list'
            })
            .when('/graphical', {
                'template': "<graph-weights></graph-weights>",
                'activeTab': 'graphical'
            })
            .when('/add', {
                'template': "<add-weight></add-weight>",
                'activeTab': 'add'
            })
            .otherwise({
                'redirectTo': '/list'
            });
        ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    })
    .controller('weightTrackerController', function ($route, $scope) {
        var ctrl = this;
        ctrl.route = $route;
    });