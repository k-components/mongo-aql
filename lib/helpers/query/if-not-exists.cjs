
var helpers = require('../../query-helpers.cjs');
var utils   = require('../../utils.cjs');

helpers.register('ifNotExists', function(ifNotExists, values, query){
  return ifNotExists ? 'if not exists' : null;
});
