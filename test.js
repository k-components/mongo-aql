var builder = require('./');

var q = {
	foo: { bar: 'baz', bar2: 'baz2' },
	"$limit": 10,
	"$skip": 100,
	"$orderby": { name: 1, name2: 1 },
	"@city": "cities",
	"@like": "likes"
}

var q2 = {
    "hi": "there",
    "foo": { "bar != 'foo' || 1": "baz", "yo": "man" },
    "$limit": 10,
    "$skip": 100,
    "$lt": { "bar": 25 },
    "$gt": { "baz": 39, "bart": 9 },
    "$ne": { "some": "value" },
    "$eq": { "foobar" : [ "1","2","3" ] },
    "$or": [ { "a" : 1 }, { "b" : 2, "c": 3 } ],
    "$and": [ { "$lt" : { "a" : 1 } }, { "$gt": { "b" : 2 } } ],
    "$orderby": { "hi REMOVE u._key IN users //": 1 },
    "@cityXX) REMOVE u IN users /* again */ // abc //": "cities"
}

var res = builder('users', q);
console.log(res);
process.exit();
