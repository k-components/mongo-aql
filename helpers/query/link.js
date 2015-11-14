
var helpers = require('../../lib/query-helpers');

helpers.register('link', function(link, values, query) {
	res = ''

	if (link && link.length) {
		for (var i = 0; i < link.length; i++) {
			link[i].cname = 'c' + i;
			res += 'FOR ' + link[i].cname + ' IN ' + link[i].collection + ' ';
			res += 'FILTER ' + query.__defaultTable + '.' + link[i].key + ' == ' + link[i].cname + '._id ';
		}	
	}

	return res;
});
