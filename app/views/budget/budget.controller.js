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

    BudgetCtrl.$inject = ['$location','authenticationService', 'budgetService']

    function BudgetCtrl($location, authenticationService, budgetService) {

        var vm = this;
        vm.search = true;
        vm.budgets = budgetService.getAllBudgets();
        vm.createBudget = function(budgetTitle) {
            budgetService.setNewBudget(budgetTitle);
            vm.budgets = budgetService.getAllBudgets();
            console.log(budgetTitle)
            // Clear input
            vm.budgetTitle = '';
            $location.path('/editbudget/'+ 0);
        }
        vm.edit = function() {
            // TO DO
        }

        vm.delete = function(key) {
            budgetService.deleteBudget(key);
        }
    };


})();
