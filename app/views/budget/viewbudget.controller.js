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
        vm.allBudgets = budgetService.getAllBudgets();
        vm.budgetId = $routeParams.itemId;
        vm.currentBudget = vm.allBudgets[vm.budgetId];
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

        $scope.chartObject = {};

        $scope.chartObject.type = "PieChart";

        $scope.onions = [
            { v: "Onions" },
            { v: 20 },
        ];

        $scope.chartObject.data = {
            "cols": [
                { id: "t", label: "Topping", type: "string" },
                { id: "s", label: "Slices", type: "number" }
            ],
            "rows": [{
                    c: [
                        { v: "Mushrooms" },
                        { v: 20 },
                    ]
                },
                { c: $scope.onions }, {
                    c: [
                        { v: "Olives" },
                        { v: 20 }
                    ]
                }, {
                    c: [
                        { v: "Zucchini" },
                        { v: 20 },
                    ]
                }, {
                    c: [
                        { v: "Pepperoni" },
                        { v: 20 },
                    ]
                }
            ]
        };

        $scope.chartObject.options = {
            title: 'Monthly expenses',
            titleTextStyle: { color: '#01579B', fontSize: 24 },
            backgroundColor: '#E1F5FE',
            chartArea: { left: 0, top: 40, width: '100%', height: '75%' }
        };

    };


})();
