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

    BudgetCtrl.$inject = ['budgetService']

    function BudgetCtrl(budgetService) {

        var vm = this;
        vm.loading = false;
        vm.duplicate= duplicate;
        vm.budgets = budgetService.getAllBudgets();
        vm.budgets.$loaded(
            function(x) {
                vm.loading = true;
            },
            function(error) {
                console.error("Error:", error);
            });
        vm.delete = function(key) {
            var confirmation = confirm("Are you sure you want to delete budget?");
            if (confirmation) {
               budgetService.deleteBudget(key); 
               confirm("Successfully deleted");
            }
            
        }

        function duplicate (id){
           var confirmation = confirm("Are you sure you want to duplicate budget?");
           if (confirmation === true) {
            budgetService.duplicateBudget(id);
           } 
        }
    };


})();
