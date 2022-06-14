
var helpers = require('../../query-helpers');

helpers.register('offset', function(offset, values){
  return " offset $" + values.push(offset);
});
