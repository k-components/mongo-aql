/*
** Very simple implementation. Expand later.
*/

var methods = {
	neighbors: 'GRAPH_NEIGHBORS'
};

/*
	todo:

	'GRAPH_EDGES',
	'GRAPH_VERTICES',
	'GRAPH_NEIGHBORS',
	'GRAPH_COMMON_NEIGHBORS',
	'GRAPH_COMMON_PROPERTIES',
	'GRAPH_PATHS',
	'GRAPH_SHORTEST_PATH',
	'GRAPH_TRAVERSAL',
	'GRAPH_TRAVERSAL_TREE',
	'GRAPH_DISTANCE_TO',
	'GRAPH_ABSOLUTE_ECCENTRICITY',
	'GRAPH_ECCENTRICITY',
	'GRAPH_ABSOLUTE_CLOSENESS',
	'GRAPH_CLOSENESS',
	'GRAPH_ABSOLUTE_BETWEENNESS',
	'GRAPH_BETWEENNESS',
	'GRAPH_RADIUS',
	'GRAPH_DIAMETER'

*/

function checkFnName(s) {
	if (!s || !methods[s]) {
		throw new Error('Invalid function name: ' + s);
	}
}

function checkGraphName(s) {
	var re = /^[a-z][a-z0-9_-]{0,63}$/i;

	if (!s || !re.test(s)) throw new Error('mongo-aql: Invalid graph name: ' + s);
}

function checkVertexExample(s) {
	var re = /^[a-z][a-z0-9_-]{0,63}\/[a-z0-9_:.@()+,=;$!*'%-]{1,255}$/i;

	if (typeof s === 'string' && !re.test(s)) throw new Error('mongo-aql: Invalid vertex example: ' + s);
}

module.exports = function(fnName, graphName, vertexExample, options) {
	checkFnName(fnName);
	checkGraphName(graphName);
	checkVertexExample(vertexExample);

	var query = 'FOR g in ' + methods[fnName] + '(@v0, @v1, @v2) RETURN g',
		values = { v0: graphName, v1: vertexExample, v2: options };

	var result = {
		query :   query,
		values:   values
	};

	return result;
}
