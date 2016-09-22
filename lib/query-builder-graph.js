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

module.exports = function(fnName, graphName, vertexExample, options) {
	checkGraphName(graphName);
	checkVertexExample(vertexExample);

	var query = 'FOR g in ' + (direction[options.direction] || direction.any) + ' @vertexExample GRAPH @graphName OPTIONS { bfs: true } ',
		values = { graphName: graphName, vertexExample: vertexExample };

	if (options.$limit) {
		query += 'LIMIT ';

		if (options.$skip) {
			query += options.$skip + ',';
		}

		query += options.$limit + ' ';
	}

	query += ' RETURN g';

	var result = {
		query :   query,
		values:   values
	};

	return result;
}
