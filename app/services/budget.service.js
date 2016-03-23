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

        var service = {
            setNewBudget: setNewBudget,
            updateBudgetTitle: updateBudgetTitle,
            addExpense: addExpense,
            getAllBudgets: getAllBudgets,
            deleteBudget: deleteBudget,
            deleteExpense: deleteExpense,
            calculateTotalExpenses: calculateTotalExpenses
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

        function addExpense(id, expenseName, expenseCategory, expenseCost) {
            // Get budget by id
            var udpdatedBudget = budgetsobj[id];
            // Get expensess []
            var expensesArray = udpdatedBudget.expenses;           
            var expense = {
                name: expenseName,
                category: expenseCategory,
                cost: expenseCost
            };
            expensesArray.push(expense);
            calculateTotalExpenses(expensesArray);
            // Edit values
            udpdatedBudget.totalExpenses = totalExpenses;
            udpdatedBudget.expenses = expensesArray;
            // Save updated budget
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

        function deleteExpense(key, budgetId) {
            var budget = budgetsobj[budgetId];
            var tmpExpenses = budgetsobj[budgetId].expenses;
            tmpExpenses.splice(key, 1);
            var total = calculateTotalExpenses(tmpExpenses);
            budget.expenses = tmpExpenses;
            budget.totalExpenses = total;
            // Save updated budget
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

    }
})();