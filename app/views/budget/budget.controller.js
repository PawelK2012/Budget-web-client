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
        vm.budgets = budgetService.getAllBudgets();
        vm.delete = function(key) {
            budgetService.deleteBudget(key);
        }
        vm.getBudgetById = function(id){
            budgetService.getBudgetById(id);
        }
    };


})();
