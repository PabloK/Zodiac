// TODO: Load location from localstorage
// TODO: Show/Hide bookmarks depending on location
  //Show bookmark
  //Hide bookmark

// TODO: Handle bookmark settings
InactiveFolder = function(){
  this.folder = null;
  this.set = function (folder) {
    this.folder = folder;
  };
  this.get = function(){
    return this.folder;
  };
};

var appId = chrome.runtime.id;
var inactiveFolder = new InactiveFolder();

// Recursively search for the first occourence of title
function traverseFindBookmark(node, searchString) {
  if (node.title == searchString) {      
      return node;
  }
  for (key in node.children) {  
    ret = traverseFindBookmark(node.children[key], searchString);
    if (ret != null) {
      return ret; 
    }
  }
  return null;
}

chrome.bookmarks.getTree(function(data){
  inactiveFolder.set(traverseFindBookmark(data[0], appId));
  if(inactiveFolder.get() == null) {
     chrome.bookmarks.create({ title : appId, parentId : "2"}, function(data) {
        inactiveFolder.set(data);
     });
  }
});
setTimeout(hideshowBookmarks,150);
function hideshowBookmarks() {
  if (false) {
  if (inactiveFolder.get() == null){
    throw chrome.i18n.getMessage("folderCreationTimeout");
  }
  // Traverse Bookmarks in activefolder and move those that are labeled incorrectly
  // Traverse Bookmarks in inactivefolder and move those that are labeled correctly
  }
  console.log("Checking Bookmarks");
  setTimeout(hideshowBookmarks,10000);
}

