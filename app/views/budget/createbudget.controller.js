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
        vm.totalExpenses = 0;
        vm.totalMonthlyExpenses = 0;
        vm.createBudget = function() {
            vm.calculateTotalExpenses();
            vm.calculateTotalMonthlyExpenses();
            budgetService.setNewBudget(vm.budgetTitle, vm.startDate, vm.endDate, vm.startingBudget,
                vm.expenses, vm.monthlyExpenses, vm.totalExpenses, vm.totalMonthlyExpenses);
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
        }

        vm.createMonthlyExpense = function() {
            var monthlyExpense = {
                name: vm.monthlyExpenseName,
                category: vm.monthlyExpenseCategory,
                cost: vm.monthlyExpenseCost
            };
            vm.monthlyExpenses.push(monthlyExpense);
            vm.monthlyExpenseName = '';
            vm.monthlyExpenseCategory = '';
            vm.monthlyExpenseCost = '';

        }

        vm.calculateTotalExpenses = function() {
            for (var i = 0; i < vm.expenses.length; i++) {
                var expense = vm.expenses[i].cost;
                vm.totalExpenses = vm.totalExpenses + expense;
            }
            return vm.totalExpenses;
        }
        vm.calculateTotalMonthlyExpenses = function() {
            for (var i = 0; i < vm.monthlyExpenses.length; i++) {
                var expense = vm.monthlyExpenses[i].cost;
                vm.totalMonthlyExpenses = vm.totalMonthlyExpenses + expense;
            }
            return vm.totalMonthlyExpenses;
        }

    };


})();
