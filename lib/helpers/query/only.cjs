
var helpers = require('../../query-helpers.cjs');
var utils = require('../../utils.cjs');

helpers.register('only', function(only, values, query){
  if (only) return "only";
  return "";
});
