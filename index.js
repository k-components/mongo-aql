
require('./lib/normalize');

var	build               = require('./lib/query-builder');

// Register query types
require('./helpers/query-types');

// Register query helpers
require('./helpers/query/values');
require('./helpers/query/order');
require('./helpers/query/limit');
require('./helpers/query/link');
require('./helpers/query/offset');
require('./helpers/query/alias');
require('./helpers/query/columns');
require('./helpers/query/table');
require('./helpers/query/where');
require('./helpers/query/return');

// Register conditional helpers
require('./helpers/conditional');

module.exports = build;
