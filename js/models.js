function Bookmark (chromeBookmark) {
  this.id = chromeBookmark.id;
  this.title = chromeBookmark.title;
  this.url = chromeBookmark.url;
  this.selected = false;
  this.parent = chromeBookmark.parentId;
  this.locations = [];
}

Bookmark.prototype.addLocation =  function(newLocation){
  if(newLocation === "" || newLocation === null) {return;}
  for(i=0; i < this.locations.length; i++){
    if (newLocation == this.locations[i]) {
      return;
    }
  }
  this.locations.push(newLocation);
}

Bookmark.prototype.removeLocation = function(locationToRemove){
  var i = 0;
  while(i < this.locations.length){
    if (locationToRemove == this.locations[i]) {
      this.locations.splice(i,1);
    } else {
      i = i + 1;
    }
  }
}

Bookmark.prototype.save = function(){
  return;
};

Bookmark.prototype.load = function(){
  return;
};

Bookmark.prototype.update = function(){
  return;
};