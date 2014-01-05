'use strict';
var App = angular.module('bookmark', 
                         ['ngRoute',
                          'ui.keypress',
                          'filters',
                          'ui.bootstrap.tooltip']).
    config(['$routeProvider', function($routeProvider) {
$routeProvider
  .when('/', {templateUrl: '../templates/bookmarks.html', controller: 'BookmarkCtrl'})
  .otherwise({redirectTo: '/'});
}]);