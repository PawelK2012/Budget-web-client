(function() {
    'use strict';

    angular.module('myApp.loader', ['ngRoute'])

    .directive('loader', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/loader/loader.partial.html',
            controller: LoaderController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {}
        };
    });

    function LoaderController() {
    }
})();