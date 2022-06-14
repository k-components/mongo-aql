
var helpers = require('../../query-helpers');
var defs    = require('../../column-def-helpers');
var utils   = require('../../utils');

helpers.register('definition', function(definition, values, query){
  if (typeof definition == 'string') return definition;

  var output = "";

  for (var k in definition){
    output += utils.quoteObject(k);

    for (var j in definition[k])
      if (defs.has(j))
        output += ' ' + defs.get(j).fn(definition[k][j], values, query, j);

    output +=  ", ";
  }

  return output.substring(0, output.length - 2);
});
