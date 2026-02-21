
var helpers = require('../../query-helpers.cjs');
var utils   = require('../../utils.cjs');

helpers.register('cascade', function(cascade, values, query){
  return cascade ? 'cascade' : null;
});
