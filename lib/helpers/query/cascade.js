
var helpers = require('../../query-helpers');
var utils   = require('../../utils');

helpers.register('cascade', function(cascade, values, query){
  return cascade ? 'cascade' : null;
});
