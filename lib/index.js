var path = require('path');

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initDojo = function(files) {
  var dojoPath = path.dirname(require.resolve('dojo'));

  // is this doing anything
  files.unshift(createPattern(__dirname + '/inhibit.js'));
  files.push(createPattern(dojoPath + '/dojo.js'));//dojo loader must be inserted at the end for custom dojoConfig to be considered
  files.push(createPattern(__dirname + '/adapter.js'));//karma heavy caching mechanism
};

initDojo.$inject = ['config.files'];

module.exports = {
  'framework:dojo': ['factory', initDojo]
};
