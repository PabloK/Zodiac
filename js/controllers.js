function BookmarkCtrl($scope, $timeout) {
  // localization  
  localize($scope,"ClearSelection");
  localize($scope,"BookmarkSettings");
  localize($scope,"Locations");
  console.log($scope.lz);
  
  $scope.locations = [];
  
  //Initialize
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
    console.log($scope.bookmarks.length);
    for(var i=0; i < $scope.bookmarks.length; i++) {
      $scope.bookmarks[i].selected = false;
    }
  };
  $scope.removeLabel = function(bookmark,index) {
    bookmark.labels.splice(index,1);
  };
  $scope.removeSearchText = function(e) {
    $scope.searchText = "";
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