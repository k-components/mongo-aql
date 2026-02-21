
var helpers = require('../../query-helpers.cjs');

helpers.register('offset', function(offset, values){
  return " offset $" + values.push(offset);
});
