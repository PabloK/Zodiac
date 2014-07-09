///////////////////////////////////////////////////////////////////////////////////////////////////////
function QuickWindowCtrl($scope) {
  log.info("Initializing quick-window");
  
  $scope.settings;
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
  
  $scope.setToday = function() {
    $scope.today = Date.today();
  };
  
  $scope.createNewStorageIfNeeded = function() {
    var d = new Date();
    if (!StorageService.getInstance().doesReportExist(d)) {
      StorageService.getInstance().storeReport(new TimeReport(d));
    }
  }
  
  $scope.updateSettings = function() {
    var temp = StorageService.getInstance().getSettings();
    if (temp && temp.ws && temp.we && temp.ls && temp.le) {
      $scope.settings = {ws: temp.ws , we: temp.we ,le: temp.le, ls: temp.ls};
    } else {
      $scope.settings = {ws: "08:00", we: "17:00",le: "00:00", ls: "00:00"};
      
    }
    $scope.createNewStorageIfNeeded();
    $scope.$apply();
  }
  StorageService.getInstance($scope.updateSettings);
  
};


///////////////////////////////////////////////////////////////////////////////////////////////////////
function SettingsCtrl($scope) {
  log.info("Initializing settings");
  
  $scope.settings;
  $scope.updateSettings = function() {
    var temp = StorageService.getInstance().getSettings();
    
    if (temp && temp.ws && temp.we && temp.ls && temp.le) {
      $scope.settings = {ws: temp.ws , we: temp.we ,le: temp.le, ls: temp.ls};
    } else {
      $scope.settings = {ws: "08:00", we: "17:00",le: "00:00", ls: "00:00"};
      
    }
    $scope.$apply();
  }
  StorageService.getInstance($scope.updateSettings);
  $scope.saveSettings = function() {
    StorageService.getInstance().storeSettings($scope.settings,
                          function(){ alert("Settings saved"); },
                          function(){ alert("Settings could not be saved"); });
  };
  
};