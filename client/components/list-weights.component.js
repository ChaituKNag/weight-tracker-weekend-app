angular.module('weightTrackerApp')
    .component('listWeights', {
        templateUrl: 'markups/list-weights.component.html',
        controller: function () {
            var ctrl = this;
            ctrl.dataSet = [
                {
                    'name': 'Naga Chaitanya Konada',
                    'id': 'nagachaitanyakonada',
                    'date': '2018-05-12',
                    'weight': 85.5
                },
                {
                    'name': 'Sowjanya Konada',
                    'id': 'sowjanyakonada',
                    'date': '2018-09-01',
                    'weight': 50.5
                },
                {
                    'name': 'Naga Chaitanya Konada',
                    'id': 'nagachaitanyakonada',
                    'date': '2018-06-27',
                    'weight': 87
                },
                {
                    'name': 'Tamoghna Konada',
                    'id': 'tamoghnakonada',
                    'date': '2016-07-12',
                    'weight': 15.3
                }
            ],
            ctrl.filterValue="";
        },
        controllerAs: 'listWeightsCtrl'
    });