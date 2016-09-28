(function() {
    'use strict';

    angular.module('myApp.addIncome', ['ngRoute'])

    .directive('addIncome', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/add-income/add-income.partial.html',
            controller: AddIncomeDirective,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                incomeName: '=incomeName',
                incomeValue: '=incomeValue'
            }
        };
    });

    function AddIncomeDirective() {
        var vm = this;
    }

})();