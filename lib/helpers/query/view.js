
var helpers = require('../../query-helpers');

helpers.register('view', function(view, values, query){
  return '"' + view + '"';
});
