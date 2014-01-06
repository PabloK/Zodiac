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
};

Bookmark.prototype.removeLocation = function(locationToRemove){
  var i = 0;
  while(i < this.locations.length){
    if (locationToRemove == this.locations[i]) {
      this.locations.splice(i,1);
    } else {
      i = i + 1;
    }
  }
};

Bookmark.prototype.save = function(){
  return;
};

Bookmark.prototype.load = function(){
  return;
};

Bookmark.prototype.update = function(){
  return;
};

function LocationList(updateFunction) {
  this.updateFunction = updateFunction;
  this.locations = [];
  this.blocked = false;
  this.getLocations();
};

// Add a new location to sync
LocationList.prototype.addLocation =  function(newLocation){
  var self = this;
  this.getLocations(function() {
    if (self.blocked) {alert(localize('ActionInProgress')); return;} else { self.blocked = true; }
    if(newLocation === "" || newLocation === null) {return;}
    for(i=0; i < self.locations.length; i++){
      if (newLocation == self.locations[i]) {
        self.blocked = false;
        return;
      }
    }
    self.locations.push(newLocation);
    self.updateFunction();
    self.blocked = false;
    self.setLocations();
  });
};

// Get locations from sync
LocationList.prototype.getLocations = function(callback) {
  var self = this;
  chrome.storage.sync.get("locations", function(data) {
    if (self.blocked) {alert(localize('ActionInProgress')); return;} else { self.blocked = true;  }
    if(data == null || !$.isArray(data.locations) || typeof(data.locations) === 'undefined') {
      data = {};
      data.locations = [];
    }
    self.locations = data.locations;
    self.blocked = false;
    if(typeof(callback) === 'function') { callback(); }
    self.updateFunction();
  });
};

// Save locations to sync
LocationList.prototype.setLocations = function() {
  if (this.blocked) {alert(localize('ActionInProgress')); return;} else { this.blocked = true;  }
  var self = this;
  chrome.storage.sync.set({"locations": self.locations},function(){
    self.blocked = false;
    self.updateFunction();
  });
};

// Remove location from sync
LocationList.prototype.removeLocation = function(locationToRemove){
  var self = this;
  this.getLocations(function(){
  
    if (self.blocked) {alert(localize('ActionInProgress')); return;} else { self.blocked = true;  }
        
    var i = 0;
    while(i < self.locations.length){
      if (locationToRemove == self.locations[i]) {
        self.locations.splice(i,1);
      } else {
        i = i + 1;
      }
    }
    self.updateFunction();
    self.blocked = false;
    self.setLocations();
  });
};