(function() {
    'use strict';

    angular.module('myApp.viewbudget', ['ngRoute', 'firebase', 'googlechart'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewbudget/:itemId', {
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

    ViewbudgetCtrl.$inject = ['$routeParams', '$scope', 'budgetService']

    function ViewbudgetCtrl($routeParams, $scope, budgetService) {

        var vm = this;
        vm.budgetId = $routeParams.itemId;
        vm.currentBudget = budgetService.getBudgetByKey(vm.budgetId);

        vm.updateBudgetTitle = function(id, title) {
            budgetService.updateBudgetTitle(id, title);
        }
        vm.addExpense = function(id, expenseName, expenseCategory, expenseCost, expenseType) {
            budgetService.addExpense(id, expenseName, expenseCategory, expenseCost, expenseType);
            vm.expenseName = '';
            vm.expenseCategory = '';
            vm.expenseCost = '';
        }
        vm.deleteExpense = function(key, expenseType) {
                budgetService.deleteExpense(key, expenseType, vm.budgetId);
            }
            // TO DO: Move chart to separate directive/service
        $scope.chartObject = {};

        $scope.chartObject.type = "PieChart";

        $scope.PieChartCurrentBalance = [
            { v: "Current founds" },
            { v: vm.currentBudget.currentBalance },
        ];

        $scope.chartObject.data = {
            "cols": [
                { id: "t", label: "Topping", type: "string" },
                { id: "s", label: "Slices", type: "number" }
            ],
            "rows": [{
                    c: [
                        { v: "Extra expenses" },
                        { v: vm.currentBudget.totalExpenses },
                    ]
                },
                { c: $scope.PieChartCurrentBalance }, {
                    c: [
                        { v: "Planed expenses" },
                        { v: vm.currentBudget.totalMonthlyExpenses },

                    ]
                }
            ]
        };
        // Chart styles
        $scope.chartObject.options = {
            title: 'Start balance: ' + vm.currentBudget.firstDayBalance,
            titleTextStyle: { color: '#01579B', fontSize: 22 },
            backgroundColor: '#E1F5FE',
            chartArea: { left: 0, top: 62, width: '100%', height: '100%' }
        };

    };


})();
