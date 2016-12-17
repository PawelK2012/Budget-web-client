(function() {
    'use strict';

    angular.module('myApp.toastMsg',  ['ngRoute'])

    .directive('toastMsg', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/toast-msg/toast-msg.partial.html',
            controller: ToastMsgDirective,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                msg: '=msg'
            }
        };
    });

    function ToastMsgDirective() {
        var vm = this;
        vm.msg = "Successful added to your budget!";
    }

})();