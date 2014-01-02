'use strict';
var App = angular.module('bookmark', ['ngRoute']).
    config(['$routeProvider', function($routeProvider) {
$routeProvider
  .when('/', {templateUrl: '../templates/bookmarks.html', controller: 'BookmarkCtrl'})
  .otherwise({redirectTo: '/home'});
}]);