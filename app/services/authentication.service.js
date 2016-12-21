(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('authenticationService', authenticationService);

    function authenticationService($rootScope, $firebase, $firebaseAuth, $firebaseObject, $location) {

        var ref = new Firebase('https://budget-db-app.firebaseio.com/');
        var auth = $firebaseAuth(ref);
        auth.$onAuth(function(authUser) {
            if (authUser) {
                var userRef = new Firebase(ref + 'users/' + authUser.uid);
                //$firebaseObject - save data as firebaseObject
                var userObj = $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
                $rootScope.message = null;
            } else {
                $rootScope.currentUser = '';
            };
        });
        var service = {
            getLogin: getLogin,
            getLogout: getLogout,
            getRegister: getRegister,
            getRequireAuth: getRequireAuth
        };

        return service;

        function getLogin(email, pass) {
            auth.$authWithPassword({
                email: email,
                password: pass
            }).then(function(regUser) {
                $location.path('/budget');
            }).catch(function(error) {
                $rootScope.errorMsg = error.message;
            });
        }

        function getLogout() {
            return auth.$unauth();
        }

        function getRequireAuth() {
            return auth.$requireAuth();
        }

        function getRegister(email, pass, name) {
            auth.$createUser({
                email: email,
                password: pass
            }).then(function(regUser) {
                var regRef = new Firebase(ref + 'users').child(regUser.uid).set({
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: name,
                    email: email,
                    currency: { id: '0', name: 'Euro', alias: '€' }
                });
                getLogin(email, pass);
            }).catch(function(error) {
                $rootScope.errorMsg = error.message;
            });
        }
    }
})();
