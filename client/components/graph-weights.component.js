angular.module('weightTrackerApp')
.component('graphWeights', {
    templateUrl: 'markups/graph-weights.component.html',
    controller: function () {
        var ctrl = this;
        ctrl.labels = ["2018-01-15", "2018-02-10", "2018-03-23", "2018-04-03", "2018-05-30", "2018-06-11", "2018-07-26"];
        ctrl.series = ['Naga Chaitanya Konada'];
        ctrl.data = [
            [86.0, 85.5, 87.3, 88, 87.5, 86.2, 86.9]
        ];
        ctrl.datasetOverride = [{ yAxisID: 'y-axis-1' }];
        ctrl.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            min: Math.floor(Math.min(...ctrl.data[0]) - 3),
                            max: Math.ceil(Math.max(...ctrl.data[0]) + 3),
                            suggestedMin: 0,
                            suggestedMax: 150,
                            stepSize: 0.5,
                            pointLabels: {
                                display: true,
                                fontColor: "red",
                                fontSize: 10
                            }
                        }
                        
                    }
                ]
            }
        };
    },
    controllerAs: 'graphWeightsCtrl'
})