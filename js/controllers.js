function QuickWindowCtrl($scope) {
  log.info("Initializing quick-window");
  
  $scope.$watch('today', function() {
    $scope.date = $scope.today.toString("MM-dd");
    $scope.year = $scope.today.toString("yyyy");
    
  }, true);
  
  $scope.today = Date.today();
  
  $scope.nextDay = function() {
    $scope.today = $scope.today.next().day();
  };
  
  $scope.prevDay = function() {
    $scope.today = $scope.today.prev().day();
  };
  
};

function SettingsCtrl($scope) {
  log.info("Initializing settings");
};