function BookmarkCtrl($scope, $timeout) {

  //Localize
  $scope.lz = function(string){
    return localize(string);
  }
  // Handeled separatley because tooltip and ng-model compete for scope destroying model  
  $(".locationTooltip").tooltip({container:'body',placement: 'bottom',title: $scope.lz('Locations')});
  
  //Initialize
  $scope.locations = new LocationList(function(){ return; });
  $scope.searhText = "";
  $scope.newLocation = "";
  $scope.currentLocation = null;
  chrome.storage.local.get('currentlocation', function(data){
    $scope.currentLocation = data.currentlocation;
    $scope.$digest();
  });
  $scope.selectedLocation = null;
  
  // find bookmarks
  chrome.bookmarks.getTree(function(data){
    var tempBookmarks = bookmarkTreeToListOfBookmarks(data[0]);
    $scope.bookmarks  = []
    for(i = 0;i < tempBookmarks.length; i++) {
      var temp = new Bookmark(tempBookmarks[i]);
      $scope.bookmarks.push(temp); 
    }
    
    $scope.$digest();
  });
  
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
    $scope.locations.addLocation($scope.newLocation);
    $scope.newLocation = "";
  };
  
  $scope.removeLocation = function(name){
    $scope.locations.removeLocation(name);
  };
  
  $scope.setCurrentLocation = function(name){
    $scope.currentLocation = name;
    chrome.storage.local.set({currentlocation : $scope.currentLocation});
  };
    
  // Clears the search text field
  $scope.removeSearchText = function(e) {
    $scope.searchText = "";
  };

  // Clear location field
  $scope.clearLocation = function(){
    $scope.newLocation = "";
  };
  
};

var bookmarkList = []
function bookmarkTreeToListOfBookmarks(node) {
  for (key in node.children) {  
    var child = node.children[key];
    if (typeof(child.url) == 'undefined') {
      bookmarkList.concat(bookmarkTreeToListOfBookmarks(child));
    } else {
      bookmarkList.push(child);
    }
  }
  return bookmarkList;
};