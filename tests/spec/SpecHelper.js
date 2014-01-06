
var storage;
beforeEach(function () {
storage = {
            locations:[],
            bookmarks:[{
                        id: "2", 
                        locations:["Home","Work"], 
                        previousparentid: "1"
                      }]
          };
});


chrome = {
  storage: {
    sync: {
      get : function(location,callback){obj = {}; obj[location] = storage[location]; callback(obj);},
      set : function(data,callback){ 
        
        for (key in data) {
          storage[key] = data[key];   
        }
        if(typeof(callback) === 'function'){ callback(); }
      }
    }
  },
  bookmarks: {
    getTree: function(callback) { callback([{title: "_root", 
                                              id:"1", 
                                              parentId:"0", 
                                              children: [{
                                                title: "Mark1", 
                                                url:"test", 
                                                parentId:"1",
                                                id:"2", 
                                                children: []}
                                                ]
                                             }]);
                        } 
  }
}
localize = function() {};

window.alert = function(){return;};