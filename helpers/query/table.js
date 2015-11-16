
var helpers = require('../../lib/query-helpers');
var queryBuilder = require('../../lib/query-builder');
var utils = require('../../lib/utils');

helpers.register('table', function(table, values, query){
  if (typeof table != 'string' ) throw new Error('Invalid table type: ' + typeof table);

  return (query.type === 'select' ? 'IN ' : '') + utils.newVar(table, values);
});
