
var helpers = require('../../query-helpers.cjs');
var utils = require('../../utils.cjs');

helpers.register('partition', function(partition, values, query) {
  if (!Array.isArray(partition)) {
    var val = (partition||'').toString();
    partition = val ? [val] : [];
  }

  var clause = partition.map(function(col) {
    return utils.quoteObject(col, query.__defaultTable);
  }).join(', ');

  return clause ? 'partition by ' + clause : '';
});
