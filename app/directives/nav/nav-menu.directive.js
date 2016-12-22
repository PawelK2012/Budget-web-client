(function() {
    'use strict';

    angular.module('myApp.navMenu', ['ngRoute'])

    .directive('navMenu', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/nav/nav-menu.partial.html',
            controller: NavMenuController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                currentUser: '=currentUser'
            }
        };
    });

    NavMenuController.$inject = ['authenticationService', '$location'];

    function NavMenuController(authenticationService, $location) {
        var vm = this;
        vm.logOut = logOut;
        vm.isActive = isActive;

        function logOut() {
            authenticationService.getLogout();
        }

        function isActive (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }
    }

})();
