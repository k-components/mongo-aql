
var helpers = require('../../query-helpers.cjs');
var utils   = require('../../utils.cjs');

helpers.register('function', function(fn, values, query){
  return fn;
});
