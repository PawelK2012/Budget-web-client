(function() {
    'use strict';

    angular.module('myApp.user', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            restrict: 'E',
            templateUrl: 'views/user/user.partial.html',
            controller: 'UserCtrl',
            controllerAs: 'vm',
            bindToController: true,
            resolve: {
                getRequireAuth: function(authenticationService) {
                    return authenticationService.getRequireAuth();
                }
            }
        });
    }])

    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$rootScope', 'authenticationService' , 'userService']

    function UserCtrl($rootScope, authenticationService, userService) {

        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.listOfCurrencies = userService.getListOfCurrencies();

        vm.setCurrency = function (currency){
            userService.setCurrency(currency);
        }

    };
})();
