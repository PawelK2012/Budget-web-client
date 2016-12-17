(function() {
    'use strict';

    angular.module('myApp.toastMsg', ['ngRoute'])

    .directive('toastMsg', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/toast-msg/toast-msg.partial.html',
            controller: ToastMsgDirective,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                msg: '=msg',
                hideToastMsg: '='
            }
        };
    });

    ToastMsgDirective.$inject = ['$timeout']

    function ToastMsgDirective($timeout) {
        var vm = this;
        vm.msg = "Successfully added to your budget!";

        $timeout(function() {
            vm.hideToastMsg = true;
        }, 3000);
    }
})();
