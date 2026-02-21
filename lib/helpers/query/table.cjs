
var helpers = require('../../query-helpers.cjs');
var queryBuilder = require('../../query-builder.cjs');
var utils = require('../../utils.cjs');

helpers.register('table', function(table, values, query){
	var re = /^[a-z][a-z0-9_-]{0,63}$/i;
	if (typeof table != 'string') throw new Error('Invalid table type: ' + typeof table);
	if (!re.test(table)) throw new Error('mongo-aql/table: Invalid table name: ' + table);

	return (query.type === 'select' ? 'IN ' : '') + utils.newVarTable(table, values);
});
