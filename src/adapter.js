  var normalizePath = function(path) {
    var normalized = [];
    var parts = path.split('/');

    for (var i = 0; i < parts.length; i++) {
        if (parts[i] === '.') {
            continue;
        }

        if (parts[i] === '..' && normalized.length && normalized[normalized.length - 1] !== '..') {
            normalized.pop();
            continue;
        }

        normalized.push(parts[i]);
    }

    return normalized.join('/');
  };

  var addTimeStampTo  = function(url,files){
    if(!url.match(/http:/i)){//loaded locally
        url = normalizePath(url);

        if (files.hasOwnProperty(url)) {
            return url + '?' + files[url];
        } else {
            console.error('There is no timestamp for ' + url + '!');
        }
    }
    return url;//loaded from CDN e.g. dojo, dojox etc
  };

  var createPatchedGetText = function(files, originalGetTextFn) {
    return function (url, asynch, onLoad) {
        return originalGetTextFn.call(this, addTimeStampTo(url,files), asynch, onLoad);
    };
  };

  var createInjectUrl = function(files, originalInjectUrlFn) {
    return function (url, callback, owner) {
        return originalInjectUrlFn.call(this, addTimeStampTo(url,files), callback, owner);
    };
  };