
var helpers = require('../../query-helpers.cjs');
var bools = {
  orReplace:  'or replace'
, temporary:  'temporary'
, all:        'all'
};

Object.keys( bools ).forEach( function( key ){
  helpers.register( key, function( bool, values ){
    return bool ? bools[ key ] : '';
  });
});
