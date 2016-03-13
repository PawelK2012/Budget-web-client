(function() {
    'use strict';

    angular.module('myApp.viewbudget', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewbudget', {
            restrict: 'E',
            templateUrl: 'views/budget/viewbudget.partial.html',
            controller: 'ViewbudgetCtrl',
            controllerAs: 'vm',
            bindToController: true,
            resolve: {
                getRequireAuth: function(authenticationService) {
                    return authenticationService.getRequireAuth();
                }
            }
        });
    }])

    .controller('ViewbudgetCtrl', ViewbudgetCtrl);

    ViewbudgetCtrl.$inject = ['$routeParams', 'authenticationService', 'budgetService']

    function ViewbudgetCtrl($routeParams, authenticationService, budgetService) {

        var vm = this;
        vm.createBudget = function(budgetTitle) {
            console.log("gggg")
        }

    };


})();
