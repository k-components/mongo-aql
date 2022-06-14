
var helpers = require('../../query-helpers');
var utils   = require('../../utils');

helpers.register('ifNotExists', function(ifNotExists, values, query){
  return ifNotExists ? 'if not exists' : null;
});
