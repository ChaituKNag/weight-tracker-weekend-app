angular.module('weightTrackerApp') 
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