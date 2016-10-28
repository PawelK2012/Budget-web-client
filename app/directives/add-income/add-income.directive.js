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
                incomeValue: '=incomeValue',
                currentBallance: '=currentBallance'
            }
        };
    });

    AddIncomeDirective.$inject = ['budgetService']

    function AddIncomeDirective(budgetService) {
        var vm = this;
        vm.addIncome = addIncome;

        function addIncome(incomeValue, currentBallance){
           console.log(vm.currentBallance)
           var newBallance = budgetService.addIncomeToCurrentBallance(incomeValue, currentBallance);
           vm.currentBallance = newBallance;
           console.log(vm.currentBallance)
        }

    }

})();