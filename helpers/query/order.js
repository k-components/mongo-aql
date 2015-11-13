var helpers = require('../../lib/query-helpers');
var utils = require('../../lib/utils');

helpers.register('order', function(order, values, query){
  var output = "SORT ";

  if (typeof order === 'string') return output + order;

  if (Array.isArray(order)) return output + order.join(', ');

  for (var key in order){
    output += utils.quoteObject(key, query.__defaultTable) + ' ' + (order[key] === 1? 'ASC': 'DESC') + ', ';
  }

  if (output === "SORT ") return "";

  return output.substring(0, output.length - 2);
});
