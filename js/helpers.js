function localize(string)
{
  return chrome.i18n.getMessage(string);
}

function hasValue (arr,value) {
  var i;
  for (i=0; i<arr.length; i++) { if (arr[i] === value) return true; }
  return false;
}

function safeCall(callback,t , args) {
  if (typeof(callback) === "function") { 
    callback.call(t,args);
  }
}