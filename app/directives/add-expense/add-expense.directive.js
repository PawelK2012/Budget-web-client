(function() {
    'use strict';

    angular.module('myApp.addExpense', ['ngRoute'])

    .directive('addExpense', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/add-expense/add-expense.partial.html',
            controller: AddExpenseController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                expenseName: '=expenseName',
                expenseCategory: '=expenseCategory',
                expenseCost: '=expenseCost'
            }
        };
    });

    function AddExpenseController() {
        var vm = this;
    }

})();