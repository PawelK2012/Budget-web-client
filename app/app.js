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
  'myApp.addExpense'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/authentication'});
}]);
