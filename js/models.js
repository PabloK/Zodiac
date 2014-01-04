function Bookmark (chromeBookmark) {
  this.id = chromeBookmark.id;
  this.title = chromeBookmark.title;
  this.url = chromeBookmark.url;
  this.selected = false;
  this.labels = [];
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