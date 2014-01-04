function BookmarkCtrl($scope, $timeout) {
  // localization  
  $scope.localizeBookmarkSettings = chrome.i18n.getMessage("BookmarkSettings");
  $scope.localizeLocations = chrome.i18n.getMessage("Locations");
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