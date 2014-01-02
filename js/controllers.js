var bookmarks = null
function BookmarkCtrl($scope, $timeout) {
  $scope.bookmarks = [];
  
  chrome.bookmarks.getTree(function(data){
    bookmarks = bookmarkTreeToListOfBookmarks(data[0]);
  });
  
  // TODO set new timeout if this fails 3 times then throw error
  $timeout(function(){ $scope.bookmarks = bookmarks}, 250, true);

}

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
}