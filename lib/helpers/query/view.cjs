
var helpers = require('../../query-helpers.cjs');

helpers.register('view', function(view, values, query){
  return '"' + view + '"';
});
