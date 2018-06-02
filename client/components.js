angular.module('weightTrackerApp')
    .component('listWeights', {
        templateUrl: 'markups/list-weights.component.html',
        controller: function () {
            let ctrl = this;
        },
        controllerAs: 'listWeightsCtrl'
    })
    .component('graphWeights', {
        templateUrl: 'markups/graph-weights.component.html',
        controller: function () {
            let ctrl = this;
            ctrl.labels = ["January", "February", "March", "April", "May", "June", "July"];
            ctrl.series = ['Series A', 'Series B'];
            ctrl.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            ctrl.onClick = function (points, evt) {
                console.log(points, evt);
            };
            ctrl.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            ctrl.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };
        },
        controllerAs: 'graphWeightsCtrl'
    })
    .component('addWeight', {
        templateUrl: 'markups/add-weight.component.html',
        controller: function () {
            let ctrl = this;
            ctrl.formFields = {
                'person': "",
                'weightNumber': 30,
                'date': new Date()
            };

            ctrl.submitEntry = function () {
                console.log(ctrl.formFields);
            }
        },
        controllerAs: 'addWeightCtrl'
    });