describe("Bookmark", function() {

  describe("Add",function() {
    var list;  
    
    beforeEach(function(done) {
      list = new LocationList(function(){return;});  
      list.addLocation('Home');
      setTimeout(function() {
        done();
      }, 25);
    });

    it("It should allow adding of locations", function(done) {    
      expect(list.locations.length).toBe(1);
      done();
    });
  });
  
  describe("Remove",function() {
    var list;  
    
    beforeEach(function(done) {
      list = new LocationList(function(){return;});  
      list.addLocation('Home');  
      setTimeout(function() {
          list.addLocation('Work');
      }, 25);
      setTimeout(function() { 
        list.removeLocation('Work');
      },50);
      setTimeout(function() { 
        done();
      },75);
    });
    it("It should allow removal of locations by name", function(done) {
        expect(list.locations.length).toBe(1);
        done();
    });
  });
  
  describe("Add many locations",function() {
    var list;  
    
    beforeEach(function(done) {
      list = new LocationList(function(){return;});  
      list.addLocation('Home');  
      setTimeout(function() {
          list.addLocation('Work');
      }, 25);
      setTimeout(function() { 
        list.addLocation('Test');
      },50);
      setTimeout(function() { 
        done();
      },75);
    });
    it("It should allow adding of manny locations", function(done) {
        expect(list.locations.length).toBe(3);
        done();
    });
  });

  describe("Add Once",function()  {
    var list;  
    
    beforeEach(function(done) {
      list = new LocationList(function(){return;});  
      list.addLocation('Home');  
      setTimeout(function() {
        list.addLocation('Home');
      }, 25);
      setTimeout(function(){
        done();
      },50);
    });

    it("It should only add a location once  ", function(done) {
      expect(list.locations.length).toBe(1);
      done();
    });
  });
  
  describe("Alert on error",function()  {
    var list;  
    
    beforeEach(function(done) {
      spyOn(window, 'alert');
      list = new LocationList(function(){return;});  
      list.blocked = true;
      list.addLocation('Home');
      setTimeout(function(){
        done();
      },25);
    });

    it("when adding is blocked an alert is shown", function(done) {
      expect(window.alert).toHaveBeenCalled();
      done();
    });
  });
  
  describe("Remove nothing",function()  {
    var list;  
    
    beforeEach(function(done) {
      list = new LocationList(function(){return;});  
      list.addLocation('Home');
      setTimeout(function(){
        list.removeLocation('No');
      },25);
      setTimeout(function(){
        done();
      },50);
    });

    it("when removing non existent item nothing happens", function(done) {
      expect(list.locations.length).toBe(1);
      expect(list.locations[0]).toBe("Home");
      done();
    });
  });
});