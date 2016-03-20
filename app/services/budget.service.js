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

        var service = {
            setNewBudget: setNewBudget,
            updateBudget: updateBudget,
            getAllBudgets: getAllBudgets,
            deleteBudget: deleteBudget
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

        function updateBudget(id, budgetTitle) {
            budgetsobj[id].$save({
               title: budgetTitle 
            }).then(function(ref) {
                ref.key() === list[id].$id; // true
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

    }
})();