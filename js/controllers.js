function BookmarkCtrl($scope, $timeout) {

  //Localize
  $scope.lz = function(string){
    return localize(string);
  }
  // Handeled separatley because tooltip and ng-model compete for scope destroying model  
  $(".locationTooltip").tooltip({container:'body',placement: 'bottom',title: $scope.lz('Locations')});
  
  //Initialize
  $scope.currentLocation = null;
  $scope.filteredBookmarks = null;
  $scope.selectedLocation = null;
  $scope.searhText = "";
  $scope.newLocation = "";
  $scope.bookmarks = new BookmarkList(function(){$scope.$digest}).bookmarks;
  
  chrome.storage.local.get('currentlocation', function(data){
    $scope.currentLocation = data.currentlocation;
    $scope.$digest();
  });
  
  $scope.locations = new LocationList(function(){ $scope.$digest(); });
  
  
  // Clear selected items
  $scope.clearSelections = function(bookmark,index) {
    if (typeof($scope.bookmarks) == 'undefined') { return; }
    
    for(var i=0; i < $scope.bookmarks.length; i++) {
      $scope.bookmarks[i].selected = false;
    }
  };

  // Add selected location to selected bookmarks
  $scope.addLocationToSelected = function() {
    if (typeof($scope.selectedLocation) == 'undefined') { return; }
    if (typeof($scope.bookmarks) == 'undefined') { return; }
        
    for(var i=0; i < $scope.bookmarks.length; i++) {
      if ($scope.bookmarks[i].selected) {
        $scope.bookmarks[i].addLocation($scope.selectedLocation)
      }
    }
  };
  
  // Clears the search text field
  $scope.removeSearchText = function(e) {
    $scope.searchText = "";
  };

  // Clear location field
  $scope.clearLocation = function(){
    $scope.newLocation = "";
  };
  
  // Remove selected location from selected bookmarks
  $scope.removeLocationFromSelected = function(){
    if (typeof($scope.selectedLocation) == 'undefined') { return; }
    if (typeof($scope.bookmarks) == 'undefined') { return; }
        
    for(var i=0; i < $scope.bookmarks.length; i++) {
      if ($scope.bookmarks[i].selected) {
        $scope.bookmarks[i].removeLocation($scope.selectedLocation)
      }
    }
  };
  
  // Remove a Location from a single bookmark
  $scope.removeLocationFromBookmark = function(bookmark,index) {
    bookmark.locations.splice(index,1);
  };
  
  // Add a new location
  $scope.addLocation = function(){
    //TODO add a wait spinner
    $scope.locations.addLocation($scope.newLocation);
    $scope.newLocation = "";
  };
  
  // Remove a location from sync storage
  $scope.removeLocation = function(name){
    //TODO add a wait spinner
    $scope.locations.removeLocation(name);
  };
  
  // Set the current location in local storage
  $scope.setCurrentLocation = function(name){
    $scope.currentLocation = name;
    chrome.storage.local.set({currentlocation : $scope.currentLocation});
  };
  
  // Select all filterd items
  $scope.selectFilteredBookmarks= function(){
    console.log($scope.filteredBookmarks);
    if (typeof($scope.filteredBookmarks.length) === 'undefined'){return;};
    for(i=0; i < $scope.filteredBookmarks.length;i++){
      $scope.filteredBookmarks[i].selected = !$scope.filteredBookmarks[i].selected;
    }
  };
  
};