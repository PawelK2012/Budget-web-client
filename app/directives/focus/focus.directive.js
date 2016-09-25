(function() {
    'use strict';

    angular.module('myApp.focus', ['ngRoute'])

    .directive('focus', function() {
        return {
            restrict: 'A',
            link: link
        };
    });

    function link(scope, elem, attr) {
            elem[0].focus();
    }

})();
