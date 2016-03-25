(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('budgetService', budgetService);

    function budgetService($rootScope, $firebase, $firebaseArray, $location) {
        var FIREBASE_URL = new Firebase('https://budget-db-app.firebaseio.com/');
        // TO FIX: Issue with $rootScope not available on frist load
        var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/budgets');
        var budgetsobj = [];
        budgetsobj = $firebaseArray(ref);
        // TO DO: Do I need allBudgets[]? budgetsobj should be enough
        // to store and watch data in reall time
        // consider refactoring getAllBudgets()
        var allBudgets = [];
        var totalExpenses = 0;
        var currentBalance = 0;

        var service = {
            setNewBudget: setNewBudget,
            updateBudgetTitle: updateBudgetTitle,
            addExpense: addExpense,
            getAllBudgets: getAllBudgets,
            deleteBudget: deleteBudget,
            deleteExpense: deleteExpense,
            calculateTotalExpenses: calculateTotalExpenses,
            calculateCurrentBalance: calculateCurrentBalance
        };

        return service;

        function setNewBudget(budgetTitle, startDate, endDate, startingBudget, expenses, monthlyExpenses, totalExpenses, totalMonthlyExpenses) {
            budgetsobj.$add({
                from: $rootScope.currentUser.firstname,
                title: budgetTitle,
                budgetStartDate: startDate.toDateString(),
                budgetEndDate: endDate.toDateString(),
                expenses: expenses,
                monthlyExpenses: monthlyExpenses,
                totalExpenses: totalExpenses,
                totalMonthlyExpenses: totalMonthlyExpenses,
                firstDayBalance: startingBudget,
                lastDayBalance: 0,
                currentBalance: startingBudget - totalExpenses - totalMonthlyExpenses,
                timestamp: Firebase.ServerValue.TIMESTAMP
            }).then(function(ref) {
                var id = ref.key();
                $location.path('/viewbudget/' + budgetsobj.$indexFor(id));
            });
        }

        function updateBudgetTitle(id, budgetTitle) {
            var udpdatedBudget = budgetsobj[id];
            udpdatedBudget.title = budgetTitle;
            budgetsobj.$save(udpdatedBudget).then(function(ref) {
                // Do something
            });
        }

        function addExpense(id, expenseName, expenseCategory, expenseCost, expenseType) {
            // Get budget by id
            var udpdatedBudget = budgetsobj[id];
            var staBudget = udpdatedBudget.firstDayBalance;
            var totalMonExpe = udpdatedBudget.totalMonthlyExpenses;
            var totalExpe = udpdatedBudget.totalExpenses;
            // We need to check what type of expense to be added
            if (expenseType === "monthly") {

                var expensesArray = udpdatedBudget.monthlyExpenses;
                // Check if monthlyExpenses[] exist in updadeBudget 
                if (!expensesArray) {
                    expensesArray = [];
                }
                var expense = {
                    name: expenseName,
                    category: expenseCategory,
                    cost: expenseCost
                };
                expensesArray.push(expense);
                calculateTotalExpenses(expensesArray);
                calculateCurrentBalance(staBudget, totalExpe, totalMonExpe);
                // Edit values
                udpdatedBudget.totalMonthlyExpenses = totalExpenses;
                udpdatedBudget.monthlyExpenses = expensesArray;
                udpdatedBudget.currentBalance = currentBalance;

            } else if (expenseType === "extra") {

                var expensesArray = udpdatedBudget.expenses;

                // Check if epxenses[] exist in updadeBudget 
                if (!expensesArray) {
                    expensesArray = [];
                }
                var expense = {
                    name: expenseName,
                    category: expenseCategory,
                    cost: expenseCost
                };
                expensesArray.push(expense);
                calculateTotalExpenses(expensesArray);
                calculateCurrentBalance(staBudget, totalExpenses, totalMonExpe);
                // Edit values
                udpdatedBudget.totalExpenses = totalExpenses;
                udpdatedBudget.expenses = expensesArray;
                udpdatedBudget.currentBalance = currentBalance;

            }

            budgetsobj.$save(udpdatedBudget).then(function(ref) {
                // Do something
            });
        }

        function getAllBudgets() {
            // Download the data from a Firebase reference into a (pseudo read-only) array
            // all server changes are applied in realtime
            return allBudgets = $firebaseArray(ref);
        }

        function deleteBudget(key) {
            budgetsobj.$remove(key);
        }

        function deleteExpense(key, expenseType, budgetId) {
            var budget = budgetsobj[budgetId];
            var currentBalance  = budget.currentBalance;

            // We need to check what type of expense to be deleted
            if (expenseType === "monthly") {

                var tmpExpenses = budgetsobj[budgetId].monthlyExpenses;
                var monthlyExpenseCost = budgetsobj[budgetId].monthlyExpenses[key].cost;
                tmpExpenses.splice(key, 1);
                var total = calculateTotalExpenses(tmpExpenses);
                budget.monthlyExpenses = tmpExpenses;
                budget.totalMonthlyExpenses = total;
                budget.currentBalance = currentBalance + monthlyExpenseCost;

            } else if (expenseType === "extra") {

                var tmpExpenses = budgetsobj[budgetId].expenses;
                var expenseCost = budgetsobj[budgetId].expenses[key].cost;
                tmpExpenses.splice(key, 1);
                var total = calculateTotalExpenses(tmpExpenses);
                budget.expenses = tmpExpenses;
                budget.totalExpenses = total;
                budget.currentBalance = currentBalance + expenseCost;

            }
            budgetsobj.$save(budget);
        }

        function calculateTotalExpenses(expensesArray) {
            totalExpenses = 0;
            for (var i = 0; i < expensesArray.length; i++) {
                var expense = expensesArray[i].cost;
                totalExpenses = totalExpenses + expense;
            }
            return totalExpenses;
        }

        function calculateCurrentBalance(staBudget, totalExpenses, totalMonExpe ){
            var expenses = totalExpenses + totalMonExpe;
            currentBalance = staBudget - expenses;
            return currentBalance;
        }

    }
})();
