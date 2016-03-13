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
        var allBudgets = [];    

        var service = {
            setNewBudget: setNewBudget,
            getAllBudgets: getAllBudgets,
            deleteBudget: deleteBudget
        };

        return service;

        function setNewBudget(budgetTitle) {
            budgetsobj.$add({
                from: $rootScope.currentUser.firstname,
                title: budgetTitle,
                timestamp: Firebase.ServerValue.TIMESTAMP
            });
        }

        function getAllBudgets() {
            return allBudgets = $rootScope.currentUser.budgets;
        }

        function deleteBudget(key) {
            budgetsobj.$remove(key);
        }

    }
})();
