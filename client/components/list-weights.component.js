angular.module('weightTrackerApp')
    .component('listWeights', {
        templateUrl: '../markups/list-weights.component.html',
        controller: ['$http', function ($http) {
            var ctrl = this;

            $http.get('/api/list').then(function (resp) {
                if(resp.data.status === "SUCCESS" && resp.data.data.length > 0) {
                    ctrl.dataSet = resp.data.data;
                    ctrl.dataSet.forEach((record) => {
                        ctrl.users[record.userId] = record.name;
                    });
                }
            });
            ctrl.filterValue="";
            ctrl.users = {};
        }],
        controllerAs: 'listWeightsCtrl'
    });