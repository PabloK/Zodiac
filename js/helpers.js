function localize(scope, string)
{
  if (typeof(scope.lz) == 'undefined') {
    scope.lz = {};  
  }
  scope.lz[string] = chrome.i18n.getMessage(string);
}