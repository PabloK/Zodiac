function BookmarkCtrl($scope, $timeout) {
  // localization  
  localize($scope,"ClearSelection");
  localize($scope,"BookmarkSettings");
  localize($scope,"Locations");
  localize($scope,"CurrentLocation");
  localize($scope,"NewLocation");
  localize($scope,"Search");
  
  
  //Initialize
  $scope.locations = [];
  chrome.storage.sync.get("locations", function(data) {
    if (typeof(data) != 'undefined' && typeof(data.locations) != 'undefined'){
      $scope.locations = data.locations;
      $scope.$digest();
    }
  });
  $scope.locationToAdd = null;
  $scope.searhText = "";
  
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
  $scope.addLocationToSelected = function() {
    if (typeof($scope.locationToAdd) == 'undefined') { return; }
    if (typeof($scope.bookmarks) == 'undefined') { return; }
        
    for(var i=0; i < $scope.bookmarks.length; i++) {
      if ($scope.bookmarks[i].selected) {
        $scope.bookmarks[i].addLocation($scope.locationToAdd)
      }
    }
  };
  
  $scope.addLocation = function(){
    if (typeof($scope.newLocation.length) == 'undefined') {return;}
    if ($scope.newLocation.length <= 0) {return;}
    $scope.locations.push($scope.newLocation);
    
    // TODO get sync scope, add new keys, save new
    
    chrome.storage.sync.set({"locations": $scope.locations},function(){console.log($scope.locations)});
  };
  
  $scope.removeLabel = function(bookmark,index) {
    bookmark.locations.splice(index,1);
  };
  
  $scope.removeSearchText = function(e) {
    $scope.searchText = "";
  };
  $scope.removeLocationFromSelected = function(){
    if (typeof($scope.locationToAdd) == 'undefined') { return; }
    if (typeof($scope.bookmarks) == 'undefined') { return; }
        
    for(var i=0; i < $scope.bookmarks.length; i++) {
      if ($scope.bookmarks[i].selected) {
        $scope.bookmarks[i].removeLocation($scope.locationToAdd)
      }
    }
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