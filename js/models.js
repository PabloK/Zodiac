///////////////////////////////////////////////////////////////////////////////////////
/// Constructor
function TimeReport (obj) {
  
  var addDateDashes = function(str) {
    str = str.substr(0, 4) + "-" + str.substr(4);
    str = str.substr(0, 7) + "-" + str.substr(7);
    return str;
  };
  
  if (obj instanceof Date) {
    // New instance
    this.date = obj;
    this.marks = [];
  } else {
    // Created from storage
    this.date = Date.parse(addDateDashes(obj.d));
    this.marks = [];
    obj.m.forEach(function(mark){
      this.marks.push(new TimeMark(mark));
    }.bind(this));
  }
  
  this.addMark = function(label) {
    var obj = {};
    var now = new Date();
    var hour = addLeadingZero(now.getHours());
    var min = addLeadingZero(now.getMinutes());

    obj.t = hour+min;
    obj.l = label;
    this.marks.push(new TimeMark(obj));
  };
  
  this.addTimedMark = function(label,hour,min) {
    var obj = {};
    obj.t = hour+min;
    obj.l = label;
    this.marks.push(new TimeMark(obj));
  };
  
  this.convertToStorageFormat = function() {
    var obj = {};
    obj.d = this.date.getFullYear().toString();
    obj.d += addLeadingZero(this.date.getMonth()+1);
    obj.d += addLeadingZero(this.date.getDate());
    obj.m = []
    this.marks.forEach(function(mark) {
      obj.m.push(mark.convertToStorageFormat());
    }.bind(this));
    return obj
  };
}
/// Methods
TimeReport.prototype.toString = function() { return "TimeReport"};

////////////////////////////////////////////////////////////////////////////////////////// Constructor
function TimeMark (obj) {
  // Fields
  var label = obj.l;
  var hour = obj.t.substr(0,2);
  var min = obj.t.substr(2,4);
  var totalHours = parseFloat(hour) + parseFloat(min)/60;
  
  this.getPosition = function() {
    return totalHours / 24.0;
  };
  this.getTime = function() {
    return hour + ":" + min
  };
  this.getLabel = function() {
    return label;
  };
  
  this.convertToStorageFormat = function() {
    return {t : hour+min, l: label};
  };
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
  
    var loadFromStorage = function(callback) {
    try {
      chrome.storage.sync.get('l', function(o) {
        storage.l = o['l'];
        chrome.storage.sync.get('s', function(o) {
          storage.s = o['s'];

          var keys = [];
          for(var i=1;i < MAXIM_DAYS_STORED;i++) {
            keys.push(i.toString());
          }
          chrome.storage.sync.get(keys, function(o) {
            for(var key in o){
              storage[key] = o[key];
            }
            
            synchronized = true;
            log.info("Synchronized!");
            safeCall(callback);
          });
        });
      });
    } catch(err) {
      // TODO: Display message!
    }
  };
  
  var findEmptyOldestOrEqualReport = function(report) {
    
    var oldestReport = 1;
    var convertedReport = report.convertToStorageFormat()
    for(var i=1;i < MAXIM_DAYS_STORED;i++) {
      if (parseInt( storage[i] && storage[i].d) == parseInt(convertedReport.d) ) {
        return i; // Equal report found
      }
      if (storage[i] === undefined) {
        return i; // Empty reporting space found
      }
      if (parseInt(storage[i].d) > parseInt(storage[oldestReport].d) ) {
        oldestReport = i; // Older report found
      }
    }

    return oldestReport; 
  }; 
  
  this.isSynchronized = function () {
    return synchronized;
  };
  
  this.storeReport = function(report) {
    if (!this.isSynchronized()) { return; }
    var allocatedStore = findEmptyOldestOrEqualReport(report);
    storage[allocatedStore] = report.convertToStorageFormat();
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
    for(i=1;i<MAXIM_DAYS_STORED;i++) {
      if (storage[i.toString()]) {
        reports[i.toString()] = new TimeReport(storage[i.toString()]);
      }
    }
    return reports;
  };
  
  this.doesReportExist = function(date) {
    if (!this.isSynchronized()) { return; }
    var d = date.getFullYear().toString();
    d += addLeadingZero(date.getMonth()+1);
    d += addLeadingZero(date.getDate());
    d = parseInt(d);
    
    for(i=1;i<MAXIM_DAYS_STORED;i++) {
      if (storage[i.toString()] === undefined) { continue; }
      if (parseInt(storage[i.toString()].d) == d) {
        return true;
      }
    }
    
    return false;
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