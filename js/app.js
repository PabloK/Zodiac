'use strict';
var App = angular.module('bookmark', 
                         ['ngRoute',
                          'ui.keypress',
                          'filters',
                          'ui.bootstrap.tooltip']).
    config(['$routeProvider', function($routeProvider) {
$routeProvider
  .when('/settings', {templateUrl: '../templates/settings.html', controller: 'SettingsCtrl'})
  .when('/quick_window', {templateUrl: '../templates/quick_window.html', controller: 'QuickWindowCtrl'})
  .otherwise({redirectTo: '/quick_window'});
}]);
App.run(function($rootScope) {
    $rootScope.lz = function (string) {
        // do some stuff
        return localize(string);
    }
})