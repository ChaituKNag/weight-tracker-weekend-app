angular.module('weightTrackerApp') 
.component('addWeight', {
    templateUrl: '/markups/add-weight.component.html',
    controller: ['$http', function ($http) {
        var ctrl = this;
        
        ctrl.formFields = {
            'id': "",
            'weight': 30,
            'date': new Date(),
            'newperson': "",
            'isNewPerson': false
        };
        ctrl.users = [];

        $http.get('/api/users').then(function (resp) {
            if(resp && resp.data.status === "SUCCESS" && resp.data.data.length > 0) {
                ctrl.users = resp.data.data;
            }
        }, function(err) {
            console.log(err);
        });

        ctrl.submitEntry = function () {
            var data = {
                'date': ctrl.formFields.date,
                'weight': ctrl.formFields.weight
            }
            // new user scenario
            if(ctrl.formFields.isNewPerson && ctrl.formFields.newperson.trim().length > 0) {
                data.name=ctrl.formFields.newperson;
            } else {
                // existing user scenario
                data.id = ctrl.formFields.id;
                data.name = ctrl.users.find(user => user._id === data.id).name;
            }

            $http.post('/api/new-record', data).then(function (resp) {
                if(resp && resp.data) {
                    console.log(resp.data);
                    window.location.hash = "#!/list";
                }
            }, function (err) {
                console.log(err);
            })


            console.log(data);
        }

        ctrl.toggleNewPerson = function () {
            ctrl.formFields.isNewPerson = !ctrl.formFields.isNewPerson;
        }
    }],
    controllerAs: 'addWeightCtrl'
});