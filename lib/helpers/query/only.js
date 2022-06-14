
var helpers = require('../../query-helpers');
var utils = require('../../utils');

helpers.register('only', function(only, values, query){
  if (only) return "only";
  return "";
});
