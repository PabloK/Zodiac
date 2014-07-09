'use strict';
log.setLevel("info");
log.info("Intializing angular");
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
    log.info("Initializing rootscope localization function");
    $rootScope.lz = function (string) {
        return localize(string);
    }
});