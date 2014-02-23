'use strict';
var App = angular.module('bookmark', 
                         ['ngRoute',
                          'ui.keypress',
                          'filters',
                          'ui.bootstrap.tooltip']).
    config(['$routeProvider', function($routeProvider) {
$routeProvider
  .when('/', {templateUrl: '../templates/quick-menu.html', controller: 'QuickWindowCtrl'})
  .otherwise({redirectTo: '/'});
}]);
App.run(function($rootScope) {
    $rootScope.lz = function (string) {
        // do some stuff
        return localize(string);
    }
})