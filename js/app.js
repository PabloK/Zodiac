'use strict';
var App = angular.module('bookmark', ['ngRoute','ui.keypress']).
    config(['$routeProvider', function($routeProvider) {
$routeProvider
  .when('/', {templateUrl: '../templates/bookmarks.html', controller: 'BookmarkCtrl'})
  .otherwise({redirectTo: '/'});
}]);