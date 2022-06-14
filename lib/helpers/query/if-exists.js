
var helpers = require('../../query-helpers');
var utils   = require('../../utils');

helpers.register('ifExists', function(ifExists, values, query){
  return ifExists ? 'if exists' : null;
});
