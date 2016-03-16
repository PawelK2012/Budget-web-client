(function() {
    'use strict';

    angular.module('myApp.createbudget', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/createbudget', {
            restrict: 'E',
            templateUrl: 'views/budget/createbudget.partial.html',
            controller: 'CreatebudgetCtrl',
            controllerAs: 'vm',
            bindToController: true,
            resolve: {
                getRequireAuth: function(authenticationService) {
                    return authenticationService.getRequireAuth();
                }
            }
        });
    }])

    .controller('CreatebudgetCtrl', CreatebudgetCtrl);

    CreatebudgetCtrl.$inject = ['budgetService']

    function CreatebudgetCtrl(budgetService) {

        var vm = this;
        vm.createBudget = function() {
            budgetService.setNewBudget(vm.budgetTitle, vm.startDate, vm.endDate, vm.startingBudget);
            // Clear input
            vm.budgetTitle = '';
        }

    };


})();
