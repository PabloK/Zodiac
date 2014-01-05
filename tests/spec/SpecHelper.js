
var storage;
beforeEach(function () {
storage = {locations:[]};
});


chrome = {
  storage: {
    sync: {
      get : function(location,callback){ callback(storage);},
      set : function(data,callback){ 
        for (key in data) {
          storage[key] = data[key];   
        }
        if(typeof(callback) === 'function'){ callback(); }
      }
    }
  }
}
localize = function() {};

window.alert = function(){return;};