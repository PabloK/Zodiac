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
  
  $scope.update = function() {
    var temp = StorageService.getInstance().getSettings();
    if (temp) {
      $scope.settings = {};
      $scope.settings.we = temp.we ? temp.we : "00:00";
      $scope.settings.ws = temp.ws ? temp.ws : "00:00";
      $scope.settings.le = temp.le ? temp.le : "00:00";
      $scope.settings.ls = temp.ls ? temp.ls : "00:00";
      $scope.settings.dl = temp.dl ? temp.dl : undefined; 
    } else {
      $scope.settings = {ws: "08:00", we: "17:00",le: "00:00", ls: "00:00", dl: undefined};
    }
    $scope.createNewStorageIfNeeded();
    $scope.$apply();
  }
  StorageService.getInstance($scope.update);
  
};


///////////////////////////////////////////////////////////////////////////////////////////////////////
function SettingsCtrl($scope) {
  log.info("Initializing settings");
  
  $scope.settings;
  $scope.labels;
  $scope.newLabel = "";
  $scope.update = function() {
    var temp = StorageService.getInstance().getSettings();
    
    if (temp) {
      $scope.settings = {};
      $scope.settings.we = temp.we ? temp.we : "00:00";
      $scope.settings.ws = temp.ws ? temp.ws : "00:00";
      $scope.settings.le = temp.le ? temp.le : "00:00";
      $scope.settings.ls = temp.ls ? temp.ls : "00:00";
      $scope.settings.dl = temp.dl ? temp.dl : undefined; 
    } else {
      $scope.settings = {ws: "08:00", we: "17:00",le: "00:00", ls: "00:00", dl: undefined};
    }
    
    $scope.labels = StorageService.getInstance().getLabels();
    if (!$scope.labels) {
      $scope.labels = {1 : "working", 2: "break"};
    }
    
    $scope.$apply();
  }
  StorageService.getInstance($scope.update);
  $scope.save = function() {
    StorageService.getInstance().storeSettings($scope.settings,
                          function(){ alert("Settings saved"); },
                          function(){ alert("Settings could not be saved"); });
    SStorageService.getInstance().storeLabels($scope.labels,
                          function(){ alert("Settings saved"); },
                          function(){ alert("Settings could not be saved"); });
  };
  $scope.createLabel = function(name) {
    if (name.length > MAXIMUM_LABEL_SIZE) {     
      alert("Label name to long!");
      return;
    };
    for(var i=1; i < MAXIMUM_LABELS; i++) {
      if ($scope.labels[i] === undefined || $scope.labels[i] === null){
        $scope.labels[i] = name;
        StorageService.getInstance().storeLabels($scope.labels);
        $scope.newLabel = "";
        return;
      }
    }
    alert("Maximum labels reached!");
  };
  
  $scope.removeLabel = function(name) {
    for(var i=1; i < MAXIMUM_LABELS; i++) {
      if ($scope.labels[i] && $scope.labels[i] == name){
        $scope.labels[i] = null;
        StorageService.getInstance().storeLabels($scope.labels);
        return;
      }
    }
  };
};