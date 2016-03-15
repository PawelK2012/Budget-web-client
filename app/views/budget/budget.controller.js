(function() {
    'use strict';

    angular.module('myApp.budget', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/budget', {
            restrict: 'E',
            templateUrl: 'views/budget/budget.partial.html',
            controller: 'BudgetCtrl',
            controllerAs: 'vm',
            bindToController: true,
            resolve: {
                getRequireAuth: function(authenticationService) {
                    return authenticationService.getRequireAuth();
                }
            }
        });
    }])

    .controller('BudgetCtrl', BudgetCtrl);

    BudgetCtrl.$inject = ['authenticationService', 'budgetService']

    function BudgetCtrl(authenticationService, budgetService) {

        var vm = this;
        vm.budgets = budgetService.getAllBudgets();
        vm.createBudget = function(budgetTitle) {
            budgetService.setNewBudget(budgetTitle);
            // Clear input
            vm.budgetTitle = '';
        }
        vm.edit = function() {
            // TO DO
        }

        vm.delete = function(key) {
            budgetService.deleteBudget(key);
        }
    };


})();
