
var helpers = require('../../lib/query-helpers'),
	utils = require('../../lib/utils');

helpers.register('link', function(link, values, query) {
	res = ''

	if (link && link.length) {
		for (var i = 0; i < link.length; i++) {
			link[i].cname = 'c' + i;
			res += 'LET ' + link[i].cname + ' = DOCUMENT(' + utils.newVar(link[i].collection, values, '@') + ', ' + query.__defaultTable + '.' + link[i].key +') ';
		}	
	}

	return res;
});

