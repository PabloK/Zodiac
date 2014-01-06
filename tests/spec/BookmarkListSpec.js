describe("BookmarkList", function() {
  describe("Load",function() {
    var blist;  
    
    beforeEach(function(done) {
      blist = new BookmarkList(function(){return;});  
      setTimeout(function(){
        done();
      },25);
      
    });

    it("it should load bookmarks", function(done) {
      expect(blist.bookmarks);
      expect(blist.bookmarks.length).not.toBe(0);
      expect(blist.bookmarks[0].toString()).toBe('Bookmark');
      done();
    });
    
    it("it should load labels for bookmarks given they exist", function(done) {
      expect(blist.bookmarks);
      expect(blist.bookmarks.length).not.toBe(0);
      expect(blist.bookmarks[0].toString()).toBe('Bookmark');
      expect(blist.bookmarks[0].locations.length).not.toBe(0);
      done();
    });
  });
  
});