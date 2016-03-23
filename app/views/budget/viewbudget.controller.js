(function() {
    'use strict';

    angular.module('myApp.viewbudget', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewbudget/:itemId', {
            restrict: 'E',
            templateUrl: 'views/budget/viewbudget.partial.html',
            controller: 'ViewbudgetCtrl',
            controllerAs: 'vm',
            bindToController: true,
            resolve: {
                getRequireAuth: function(authenticationService) {
                    return authenticationService.getRequireAuth();
                }
            }
        });
    }])

    .controller('ViewbudgetCtrl', ViewbudgetCtrl);

    ViewbudgetCtrl.$inject = ['$routeParams', 'budgetService']

    function ViewbudgetCtrl($routeParams, budgetService) {

        var vm = this;
        vm.allBudgets = budgetService.getAllBudgets();
        vm.budgetId = $routeParams.itemId;

        vm.updateBudgetTitle = function(id, title) {
            budgetService.updateBudgetTitle(id, title);
        }
        vm.addExpense = function(id, expenseName, expenseCategory, expenseCost) {
            budgetService.addExpense(id,expenseName, expenseCategory, expenseCost);
            vm.expenseName = '';
            vm.expenseCategory = '';
            vm.expenseCost = '';
        }
        vm.addMonthlyExpense = function(id, expenseName, expenseCategory, expenseCost) {
            budgetService.addMonthlyExpense(id,expenseName, expenseCategory, expenseCost);
            vm.monthlyExpenseName = '';
            vm.monthlyExpenseCategory = '';
            vm.monthlyExpenseCost = '';
        }
        vm.deleteExpense = function(key, expenseType) {
            budgetService.deleteExpense(key, expenseType, vm.budgetId);
        }
    };


})();