(function() {
    'use strict';

    angular.module('myApp.editbudget', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/editbudget/:itemId', {
            restrict: 'E',
            templateUrl: 'views/budget/editbudget.partial.html',
            controller: 'EditbudgetCtrl',
            controllerAs: 'vm',
            bindToController: true,
            resolve: {
                getRequireAuth: function(authenticationService) {
                    return authenticationService.getRequireAuth();
                }
            }
        });
    }])

    .controller('EditbudgetCtrl', EditbudgetCtrl);

    EditbudgetCtrl.$inject = ['$routeParams', 'budgetService']

    function EditbudgetCtrl($routeParams, budgetService) {

        var vm = this;
        vm.allBudgets = budgetService.getAllBudgets();
        vm.item = vm.allBudgets[1]
        //vm.budgetId = $routeParams.itemId;
        console.log(vm.item);
    };


})();
