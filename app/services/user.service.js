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
            //var currency = ['EURO €', 'USD $', 'POUNDS £', 'PLN Zł'];
            var currency = [
                { id: '0', name: 'EURO €' },
                { id: '1', name: 'USD $' },
                { id: '2', name: 'POUNDS £' },
                { id: '3', name: 'PLN Zł' }
            ];
            return currency;
        }

        function setCurrency(newCurrency) {


            // userObj.$bindTo($rootScope, "data").then(function() {
            //     console.log($rootScope.data); // { foo: "bar" }
            //     $rootScope.data.currency = newCurrency; // will be saved to the database
            //     ref.set({ currency: newCurrency }); // this would update the database and $scope.data
            // });

        }


    }
})();
