// Models
InactiveFolder = function(){
  this.folder = null;
};
InactiveFolder.prototype.set = function (folder) {
    this.folder = folder;
  };
InactiveFolder.prototype.get = function(){
  return this.folder;
};

// Initialize
var appId = chrome.runtime.id;
var inactiveFolder = new InactiveFolder();

// Helpers
// Search array for string key
function hasValue (arr,value) {
  var i;
  for (i=0; i<arr.length; i++) { if (arr[i] === value) return true; }
  return false;
}

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

// Hide and show bookmarks
function hideShowBookmarks() {
  console.log("Checking Bookmarks");
  if (inactiveFolder.get() == null){
    alert(chrome.i18n.getMessage("folderCreationTimeout"));
    throw chrome.i18n.getMessage("folderCreationTimeout");
  }
  chrome.storage.sync.get('bookmarks',function(data){
    var sbookmarks = data.bookmarks
    chrome.storage.local.get('currentlocation',function(data){
      var currentlocation = data.currentlocation;
      for(key in sbookmarks){
        var newLocation = key;
        if(!hasValue(sbookmarks[key].locations,currentlocation)){
            newLocation = inactiveFolder.folder.id;
        }
        if(hasValue(sbookmarks[key].locations,currentlocation)){
            newLocation = '1';        
        }
        chrome.bookmarks.move(key,{parentId: newLocation});
      }
    });
  });
}

// Add the inactive folder
chrome.bookmarks.getTree(function(data){
  inactiveFolder.set(traverseFindBookmark(data[0], appId));
  if(inactiveFolder.get() == null) {
     chrome.bookmarks.create({ title : appId, parentId : "2"}, function(data) {
        inactiveFolder.set(data);
        hideShowBookmarks(); 
     });
    return;
  }
  hideShowBookmarks(); 
});

//Handlers
// Handle storage change
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if(('bookmarks' in changes) || ('locations' in changes) || ('currentlocation' in changes)){
    hideShowBookmarks(); 
  }
});