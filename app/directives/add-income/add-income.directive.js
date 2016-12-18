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
                currentBallance: '=currentBallance',
                submitForm: '='
            }
        };
    });

    AddIncomeDirective.$inject = ['budgetService', '$scope']

    function AddIncomeDirective(budgetService, $scope) {
        var vm = this;
        vm.addIncome = addIncome;

        function addIncome(incomeValue, currentBallance){
           var newBallance = budgetService.addIncomeToCurrentBallance(incomeValue, currentBallance);
           vm.currentBallance = newBallance;
        }

        // Clear inputs if formName.$submitted true
        $scope.$watch("vm.submitForm", function() {
            vm.incomeName = undefined;
            vm.incomeValue = undefined;
        })

    }

})();