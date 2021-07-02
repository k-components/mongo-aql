
require('./lib/normalize');

// Register query types
require('mongo-aql/lib/helpers/query-types');

// Register query helpers
require('mongo-aql/lib/helpers/query/values');
require('mongo-aql/lib/helpers/query/order');
require('mongo-aql/lib/helpers/query/limit');
require('mongo-aql/lib/helpers/query/embed');
require('mongo-aql/lib/helpers/query/offset');
require('mongo-aql/lib/helpers/query/alias');
require('mongo-aql/lib/helpers/query/columns');
require('mongo-aql/lib/helpers/query/table');
require('mongo-aql/lib/helpers/query/where');
require('mongo-aql/lib/helpers/query/return');
require('mongo-aql/lib/helpers/query/text');

// Register conditional helpers
require('mongo-aql/lib/helpers/conditional');

module.exports = require('./lib/query-builder');
module.exports.neighbors = require('./lib/query-builder-graph').neighbors;
module.exports.edge = require('./lib/query-builder-graph').edge;
