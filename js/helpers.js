function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function localize(scope, string)
{
  if (typeof(scope.lz) == 'undefined') {
    scope.lz = {};  
  }
  scope.lz[string] = chrome.i18n.getMessage(string);
}