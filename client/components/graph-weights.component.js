angular.module('weightTrackerApp')
.component('graphWeights', {
    templateUrl: '/markups/graph-weights.component.html',
    controller: ['$http','$filter', function ($http, $filter) {
        var ctrl = this;
        ctrl.filterValue = "";
        ctrl.users = [];
        ctrl.graph = {};
        ctrl.graph.labels = [];
        ctrl.graph.series = [];
        ctrl.graph.data = [
            []
        ];
        ctrl.graph.datasetOverride = [{ yAxisID: 'y-axis-1' }];
        ctrl.graph.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            min: Math.floor(Math.min(...ctrl.graph.data[0]) - 3),
                            max: Math.ceil(Math.max(...ctrl.graph.data[0]) + 3),
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

        ctrl.userSelected = function () {
            if(ctrl.filterValue !== "") {
                $http.get(`/api/list/${ctrl.filterValue}`).then(function (resp) {
                    if(resp.data.status === "SUCCESS" && resp.data.data.length>0) {
                        let records = resp.data.data;
                        ctrl.graph.labels = [];
                        ctrl.graph.series[0] = "";
                        ctrl.graph.data[0] = [];
                        records.forEach(function(record) {
                            ctrl.graph.labels.push($filter('date')(record.date, 'yyyy-MM-dd'));
                            ctrl.graph.series[0] = record.name;
                            ctrl.graph.data[0].push(record.weight);
                        });
                        ctrl.graph.options.scales.yAxes[0].ticks.min = Math.floor(Math.min(...ctrl.graph.data[0]) - 3);
                        ctrl.graph.options.scales.yAxes[0].ticks.max = Math.ceil(Math.max(...ctrl.graph.data[0]) + 3);
                    }
                })
            }
        }
        
        $http.get('/api/users').then(function (resp) {
            if(resp && resp.data.status === "SUCCESS" && resp.data.data.length > 0) {
                ctrl.users = resp.data.data;
            }
        }, function(err) {
            console.log(err);
        });
    }],
    controllerAs: 'graphWeightsCtrl'
})