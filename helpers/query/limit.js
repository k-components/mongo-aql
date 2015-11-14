
var helpers = require('../../lib/query-helpers');

helpers.register('limit', function(limit, values, query){
  if ( Array.isArray(limit) && limit.length === 2 ) {
    return " LIMIT @" + values.push(limit[0]) + ", @" + values.push(limit[1]);
  }
  else if ( typeof limit === 'number' )
    return " LIMIT @" + values.push(limit);
  else
    throw new Error('Invalid limit type `' + typeof limit  + '` for query helper `limit`. Limit must be number or \'all\'');
});
