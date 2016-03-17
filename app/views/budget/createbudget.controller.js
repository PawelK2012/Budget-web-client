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
        vm.monthlyExpenses = [];
        vm.expenses = [];
        vm.createBudget = function() {
            budgetService.setNewBudget(vm.budgetTitle, vm.startDate, vm.endDate, vm.startingBudget, vm.expenses, vm.monthlyExpenses);
            // Clear input
            vm.budgetTitle = '';
        }
        vm.createExpense = function() {
            var expense = {
                name: vm.expenseName,
                category: vm.expenseCategory,
                cost: vm.expenseCost
            };
            vm.expenses.push(expense);
            vm.expenseName = '';
            vm.expenseCategory = '';
            vm.expenseCost = '';
            console.log(vm.expenses)
        }

        vm.createMonthlyExpense = function(){
            var monthlyExpense = {
                name: vm.monthlyExpenseName,
                category: vm.monthlyExpenseCategory,
                cost: vm.monthlyExpenseCost
            };
            vm.monthlyExpenseName = '';
            vm.monthlyExpenseCategory = '';
            vm.monthlyExpenseCost = '';
            vm.monthlyExpenses.push(monthlyExpense);
        }

    };


})();
