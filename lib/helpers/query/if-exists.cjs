
var helpers = require('../../query-helpers.cjs');
var utils   = require('../../utils.cjs');

helpers.register('ifExists', function(ifExists, values, query){
  return ifExists ? 'if exists' : null;
});
