(function() {
    'use strict';

    angular.module('myApp.testimonials', ['ngRoute'])

    .directive('testimonials', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/testimonials/testimonials.partial.html',
            controller: TestimonialsDirective,
            controllerAs: 'vm',
            bindToController: true
        };
    });


    function TestimonialsDirective() {
        var vm = this;

        vm.testimonialsData = {
            "testimonials": [{
                "name": "Orla O'Mara",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
                "img": "icons/review1.jpg",
                "company": "Lotus"
            }, {
                "name": "John Mc Donald",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
                "img": "icons/review2.jpg",
                "company": "Mc Muff"
            }, {
                "name": "Alina Koprovnik",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
                "img": "icons/review3.jpg",
                "company": "Polonez"
            }]
        };
    }

})();
