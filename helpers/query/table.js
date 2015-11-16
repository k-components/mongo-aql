
var helpers = require('../../lib/query-helpers');
var queryBuilder = require('../../lib/query-builder');
var utils = require('../../lib/utils');

helpers.register('table', function(table, values, query){
	var re = /^[a-z0-9_-]+$/i;
	if (typeof table != 'string') throw new Error('Invalid table type: ' + typeof table);
	if (!re.test(table)) throw new Error('Invalid table name: ' + table);

	return (query.type === 'select' ? 'IN ' : '') + table;
});
