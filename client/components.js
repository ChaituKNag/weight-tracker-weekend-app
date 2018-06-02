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
    })
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
    .component('addWeight', {
        templateUrl: 'markups/add-weight.component.html',
        controller: function () {
            var ctrl = this;
            ctrl.formFields = {
                'person': "",
                'weightNumber': 30,
                'date': new Date(),
                'newperson': "",
                'isNewPerson': false
            };

            ctrl.submitEntry = function () {
                console.log(ctrl.formFields);
            }

            ctrl.toggleNewPerson = function () {
                ctrl.formFields.isNewPerson = !ctrl.formFields.isNewPerson;
            }
        },
        controllerAs: 'addWeightCtrl'
    });