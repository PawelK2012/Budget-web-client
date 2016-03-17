(function() {
    'use strict';

    angular.module('myApp.navMenu', ['ngRoute'])

    .directive('navMenu', function() {
        return {
            restrict: 'E',
            //replace: 'true',
            templateUrl: 'directives/nav/nav-menu.partial.html',
            controller: NavMenuController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {}
        };
    });

    function NavMenuController() {
        var vm = this;
        vm.consoleLog = function(){
            console.log("nav menu")
        }

    }

})();


// (function() {
//     'use strict';
//     angular.module('myApp.navmenu')
//         .directive('navMenu', NavMenu);

//     function NavMenu() {
//         var directive = {
//             restrict: 'E',
//             //replace: 'true',
//             templateUrl: 'directives/nav/nav-menu.partial.html',
//             controller: NavMenuController,
//             controllerAs: 'vm',
//             bindToController: true,
//             scope: {}
//         };
//         return directive;
//     }

//     function NavMenuController() {
//         var vm = this;

//     }
// })();
