(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('budgetService', budgetService);

    function budgetService($rootScope, $firebase, $firebaseArray) {

        var FIREBASE_URL = new Firebase('https://budget-db-app.firebaseio.com/');
        var budgetsobj = [];
        var allBudgets = [];
        /// This should be attached to the factory and passed to budgetService
        /// Needs to be refactored 
        function getDBRef() {
            var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/budgets');
            return budgetsobj = $firebaseArray(ref);
        }


        var service = {
            setNewBudget: setNewBudget,
            getAllBudgets: getAllBudgets,
            deleteBudget: deleteBudget
        };

        return service;

        function setNewBudget(budgetTitle) {
            getDBRef();
            budgetsobj.$add({
                from: $rootScope.currentUser.firstname,
                //content: budgetDescription || 'Default description',
                title: budgetTitle,
                //dateFrom: dateFrom,
                //dateTo: dateTo,
                timestamp: Firebase.ServerValue.TIMESTAMP
            });
            //budget = '';
        }

        function getAllBudgets() {
            allBudgets = $rootScope.currentUser.budgets;
        }

        function deleteBudget(key) {
           //TO DO 
        }

    }
})();
