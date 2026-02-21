
var helpers = require('../../query-helpers.cjs');
var conditionBuilder = require('../../condition-builder.cjs');

helpers.register('having', function(having, values, query){
  var output = conditionBuilder(having, query.__defaultTable, values);
  if (output.length > 0) output = 'having ' + output;
  return output;
});
