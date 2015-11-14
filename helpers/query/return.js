
var helpers = require('../../lib/query-helpers');

helpers.register('return', function(link, values, query) {
	var link = query.link;
	res = 'RETURN '

	if (link && link.length) {
		res += 'merge(u';

		for (var i = 0; i < link.length; i++) {
			res += ', { ' + link[i].key + ': ' + link[i].cname + ' }';
		}	
		res += ')';
	}
	else {
		res += query.__defaultTable;
	}

	return res;
});
