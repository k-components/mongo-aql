
var helpers = require('../../query-helpers.cjs');
var queryBuilder = require('../../query-builder.cjs');

helpers.register( 'queries', function( queries, values, query ){
  var allowedCombinations = [ 'union', 'intersect', 'except' ];
  var joiner = query.joiner || ' ';

  if ( allowedCombinations.indexOf( query.type ) > -1 ){
    joiner = query.type;

    if ( query.all ){
      joiner += ' ' + helpers.get('all').fn( query.all, values, query );
    }

    joiner = ' ' + joiner + ' ';
  }

  return queries.map( function( q ){
    return queryBuilder( q, values );
  }).join( joiner );
});
