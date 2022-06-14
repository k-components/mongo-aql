
var helpers = require('../../query-helpers');
var utils   = require('../../utils');

helpers.register('function', function(fn, values, query){
  return fn;
});
