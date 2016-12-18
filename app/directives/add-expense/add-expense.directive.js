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
                extraExpense: '=extraExpense',
                expenseName: '=expenseName',
                expenseCategory: '=expenseCategory',
                expenseCost: '=expenseCost',
                submitForm: '='
            }
        };
    });

    AddExpenseController.$inject = ['$scope']

    function AddExpenseController($scope) {
        var vm = this;
        vm.expenseCategory = 'Food';
        vm.allCategories = ['Food', 'Sport', 'Car', ' Entertainment', 'Rent', 'Bills' , 'Health', 'Other'];
        // Clear inputs if formName.$submitted true
        $scope.$watch("vm.submitForm", function() {
            vm.expenseName = undefined;
            vm.expenseCost = undefined;
        })
    }

})();