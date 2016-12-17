'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'googlechart',
  'myApp.authentication',
  'myApp.budget',
  'myApp.viewbudget',
  'myApp.createbudget',
  'myApp.navMenu',
  'myApp.user',
  'myApp.addExpense',
  'myApp.addIncome',
  'myApp.toastMsg',
  'myApp.focus'
]).run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/authentication');
    }
  });
}]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/authentication'});
}]);
