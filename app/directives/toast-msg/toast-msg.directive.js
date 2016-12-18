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
                showMsg: '=showMsg'
            }
        };
    });

    ToastMsgDirective.$inject = ['$timeout']

    function ToastMsgDirective($timeout) {
        var vm = this;
        vm.successMsg = "Successfully added to your budget!";

        $timeout(function() {
            vm.showMsg = false;
        }, 3000);
    }
})();
