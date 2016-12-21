(function() {
    'use strict';

    angular.module('myApp.authentication', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/authentication', {
            restrict: 'E',
            templateUrl: 'views/authentication/authentication.partial.html',
            controller: 'AuthenticationCtrl',
            controllerAs: 'vm',
            bindToController: true
        });
    }])

    .controller('AuthenticationCtrl', AuthenticationCtrl);

    AuthenticationCtrl.$inject = ['authenticationService', '$scope']

    function AuthenticationCtrl(authenticationService, $scope) {

        var vm = this;
        vm.redirectAuthenctication = redirectAuthenctication;
        vm.cancel = cancel;

        function redirectAuthenctication(email, pass, name) {
            if (name) {
                authenticationService.getRegister(email, pass, name);
            } else {
                authenticationService.getLogin(email, pass);
            }
        }

        function cancel() {
            vm.logMe = false;
            vm.regMe = false;
            $scope.$parent.errorMsg = '';
        }
    };
})();
