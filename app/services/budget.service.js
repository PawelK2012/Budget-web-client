(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('budgetService', budgetService);

    function budgetService($rootScope, $firebase, $firebaseArray) {
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
            getAllBudgets: getAllBudgets,
            deleteBudget: deleteBudget
        };

        return service;

        function setNewBudget(budgetTitle, startDate, endDate, startingBudget) {
            budgetsobj.$add({
                from: $rootScope.currentUser.firstname,
                title: budgetTitle,
                budgetStartDate: startDate,
                budgetEndDate: endDate,
                firstDayBalance: startingBudget,
                lastDayBalance: 0,
                currentBalance: startingBudget,
                timestamp: Firebase.ServerValue.TIMESTAMP
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
