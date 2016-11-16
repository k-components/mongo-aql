var utils = require('./utils');

/*
** Very simple implementation. Expand later.
*/

var direction = {
	outbound: 'OUTBOUND',
	inbound: 'INBOUND',
	any: 'ANY'
};

function checkGraphName(s) {
	var re = /^[a-z][a-z0-9_-]{0,63}$/i;

	if (!s || !re.test(s)) throw new Error('mongo-aql: Invalid graph name: ' + s);
}

function checkVertexExample(s) {
	var re = /^[a-z][a-z0-9_-]{0,63}\/[a-z0-9_:.@()+,=;$!*'%-]{1,255}$/i;

	if (typeof s === 'string' && !re.test(s)) throw new Error('mongo-aql: Invalid vertex example: ' + s);
}

module.exports.edge = function(graphName, from, to, edgeExample) {
	checkGraphName(graphName);

	var values = { graphName: graphName, from: from },
		query = 'FOR v, e, p in OUTBOUND @from GRAPH @graphName OPTIONS { bfs: true } FILTER p.vertices[1]._id == ' + utils.newVar(to, values);

	// add edge filters
	if (edgeExample) {
		for (var i in edgeExample) {
			query += 'p.edges[0].' + utils.newVar(i, values) + ' == ' + utils.newVar(edgeExample[i], values, '', true);
		}
	}

	query += ' RETURN v';

	var result = {
		query :   query,
		values:   values
	};

	return result;
}

module.exports.neighbors = function(graphName, vertexExample, edgeExample, options) {
	checkGraphName(graphName);
	checkVertexExample(vertexExample);

	if (edgeExample) {
		var query = 'FOR v, e, p in ' + (direction[options.direction] || direction.any) + ' @vertexExample GRAPH @graphName OPTIONS { bfs: true } FILTER ',
			values = { graphName: graphName, vertexExample: vertexExample };

		// add edge filters

		for (var i in edgeExample) {
			query += 'p.edges[0].' + utils.newVar(i, values) + ' == ' + utils.newVar(edgeExample[i], values, '', true);
		}

		if (options.$limit) {
			query += 'LIMIT ';

			if (options.$skip) {
				query += options.$skip + ',';
			}

			query += options.$limit + ' ';
		}

		query += ' RETURN v';
	}
	else {
		var query = 'FOR v in ' + (direction[options.direction] || direction.any) + ' @vertexExample GRAPH @graphName OPTIONS { bfs: true } ',
			values = { graphName: graphName, vertexExample: vertexExample };

		if (options.$limit) {
			query += 'LIMIT ';

			if (options.$skip) {
				query += options.$skip + ',';
			}

			query += options.$limit + ' ';
		}

		query += ' RETURN v';
	}

	var result = {
		query :   query,
		values:   values
	};

	return result;
}

