///////////////////////////////////////////////////////////////////////////////////////
/// Constructor
function TimeReport () {
  // Fields
   
}
/// Methods
TimeReport.prototype.toString = function() { return "TimeReport"};

////////////////////////////////////////////////////////////////////////////////////////// Constructor
function TimeMark () {
  // Fields
   
}
/// Methods
TimeMark.prototype.toString = function() { return "TimeMark"};


///////////////////////////////////////////////////////////////////////////////////////
/// Constructor
function StorageService(callback) {
  if (arguments.callee.instance && arguments.callee.instance.isSynchronized) {
    return arguments.callee.instance;
  }
  
  var synchronized = false;
  var storage = {};
  
  this.isSynchronized = function () {
    return synchronized;
  };
  
  this.storeReport = function() {
    // TODO: if not insync show message and return
    // find empty field
      // found save the report there
      // not found finde the oldest report and overwrite
    // sync the found number with the new data
  };
  
  this.storeSettings = function(settings, callback, errorCallback) {
    if (!this.isSynchronized()) { safeCall(errorCallback); return; }
    synchronized = false;
    storage.s = settings;
    try {
      chrome.storage.sync.set({'s': storage.s }, function(){
        synchronized = true;
        safeCall(callback);
      });
    } catch(err) {
      safeCall(errorCallback);
    }
  };
      
  this.storeLabels = function(labels, callback, errorCallback) {
    if (!this.isSynchronized()) { safeCall(errorCallback); return; }
    synchronized = false;
    storage.l = labels;
    try {
      chrome.storage.sync.set({'l': storage.l }, function(){
        synchronized = true;
        safeCall(callback);
      });
    } catch(err) {
      safeCall(errorCallback); 
    }
  };
  
  this.getSettings = function() {
    if (!this.isSynchronized()) { return; }
    return storage.s;
  };
    
  this.getLabels = function() {
    if (!this.isSynchronized()) { return; }
    return storage.l;
  };
  
  this.getReports = function() {
    if (!this.isSynchronized()) { return; }
    var reports = {}
    for(i=1;i<=MAXIM_DAYS_STORED;i++) {
        reports[i.toString()] = storage[i.toString()];
    }
    return reports;
  };
      
  var loadFromStorage = function(callback) {
    try {
      chrome.storage.sync.get('l', function(o) {
        storage.l = o['l'];
        chrome.storage.sync.get('s', function(o) {
          storage.s = o['s'];

          var loadCounter = 0;
          for(i=1;i<=MAXIM_DAYS_STORED;i++) {
            var key = i.toString()
            chrome.storage.sync.get(key, function(o) {
              storage[key] = o[key];
              loadCounter++;
              if (loadCounter >= MAXIM_DAYS_STORED) { 
                log.info("Synchronized!");
                synchronized = true; 
                safeCall(callback);
              }
            });
          }
        });
      });
    } catch(err) {
      // TODO: Display message!
    }
  };
  
  loadFromStorage(callback);
  arguments.callee.instance = this;
}
StorageService.getInstance = function(callback) {
    var singletonClass = new StorageService(callback);
    var timeOut=0;
    return singletonClass;
};

StorageService.prototype.storeSettings = function(settings, callback, errorCallback) {
  safeCall(errorCallback);
};

StorageService.prototype.storeLabels = function(settings, callback, errorCallback) {
  safeCall(errorCallback);
};

StorageService.prototype.storeReport = function(settings, callback, errorCallback) {
  safeCall(errorCallback);
};
      
StorageService.prototype.toString = function() { return "StorageService"};