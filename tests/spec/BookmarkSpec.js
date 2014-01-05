describe("Bookmark", function() {
  var bookmark;
  
  beforeEach(function() {
    bookmark = new Bookmark({title: 'test', url:'', parentid: 1});
  });

  it("It should allow adding of locations", function() {
    expect(bookmark.locations.length).toBe(0);
    bookmark.addLocation('test');
    expect(bookmark.locations.length).toBe(1);
  });
  
  it("It should only add a location once  ", function() {
    expect(bookmark.locations.length).toBe(0);
    bookmark.addLocation('test');
    bookmark.addLocation('test');
    expect(bookmark.locations.length).toBe(1);
  });
  
  it("It should allow removal of locations by name", function() {
    expect(bookmark.locations.length).toBe(0);
    bookmark.addLocation('test');
    bookmark.addLocation('a');
    bookmark.removeLocation('test');
    expect(bookmark.locations[0]).toBe("a");
    expect(bookmark.locations.length).toBe(1);
  });
});
