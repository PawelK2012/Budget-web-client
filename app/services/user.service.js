(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('userService', userService);

    function userService($rootScope, $firebase, $firebaseArray, $firebaseObject, $location) {
        var ref = new Firebase('https://budget-db-app.firebaseio.com/');
        var userRef = new Firebase(ref + 'users/' + $rootScope.currentUser.$uid);
        //$firebaseObject - save data as firebaseObject
        var userObj = $firebaseObject(userRef);
        //$rootScope.currentUser = userObj;

        var service = {
            getListOfCurrencies: getListOfCurrencies,
            setCurrency: setCurrency
        };

        return service;

        function getListOfCurrencies() {
            var currency = ['EURO €', 'USD $', 'POUNDS £', 'PLN zł'];
            return currency;
        }

        function setCurrency(newCurrency) {
            $rootScope.currentUser.currency = newCurrency;
        }


    }
})();
