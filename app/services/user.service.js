(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('userService', userService);

    function userService($rootScope, $firebase, $firebaseObject) {
        var ref = new Firebase('https://budget-db-app.firebaseio.com/');
        var userRef = new Firebase(ref + 'users/' + $rootScope.currentUser.$id);
        //$firebaseObject - save data as firebaseObject
        var userObj = $firebaseObject(userRef);
        var service = {
            getListOfCurrencies: getListOfCurrencies,
            setCurrency: setCurrency
        };

        return service;

        function getListOfCurrencies() {
            var currency = [
                { id: '0', name: 'Euro', alias: '€' },
                { id: '1', name: 'Usd', alias: '$' },
                { id: '2', name: 'Pound', alias: '£' },
                { id: '3', name: 'Pln', alias: 'Zł' }
            ];
            return currency;
        }

        function setCurrency(newCurrency) {
            userObj.currency = { id: newCurrency.id, name: newCurrency.name, alias: newCurrency.alias };
            userObj.$save().then(function(ref) {}, function(error) {
                console.log("Error:", error);
            });
        }
    }
})();
