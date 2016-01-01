var builder = require('./');

var q = {
	foo: { bar: 'baz', bar2: 'baz2' },
	"$limit": 10,
	"$skip": 100,
	"$orderby": { name: 1, name2: 1 },
	"@city": "cities"
}

var q2 = {
		"hi": "there",
		"foo": { "bar != 'foo' || 1": "baz", "yo": "man" },
		"$limit": 10,
		"$skip": 100,
		"testing": { $in: [1,2,3,4,5,6,7,8,9] },
		"$lt": { "bar": 25 },
		"$gt": { "baz": 39, "bart": 9 },
		"$ne": { "some": "value" },
		"$or": [ { "a" : 1 }, { "b" : 2, "c": 3 } ],
		"$and": [ { "$lt" : { "a" : 1 } }, { "$gt": { "b" : 2 } } ],
		"$orderby": { "hi REMOVE u._key IN users //": 1 },
		"@cityXX) REMOVE u IN users /* again */ // abc //": "cities"
}


var q3 = {
	xx: { yyr: 'zz' },
	"$limit": 10,
	"$skip": 100,
	"$orderby": { name: 1, name2: 1 },
	"@city": "cities"
}

var q4 = { "$eq": { "foobar" : [ "5","6","7" ] } }

var q5 = { "foobar": { "$eq" : [ "1","2","3" ] } }

var q6 = { "foobar": [ "1","2","3" ] }

var q7 = {
		"$ne": { "some": "value" }
}

var q8 = {
		foobar: { $in: [1] }
}

var q9 = {
		"foobar": { "x": { "y": { "z": "å" } } }
}

var q10 = { "foobar": { "x": { "y": { "$or": [ { "z": "å" }, { "z": "ä" }, { "z": "ö" } ] } } } }

var q11 = { "$or": [ { "a" : 1 }, { "b" : 2, "c": 3 } ] }

var q12 = { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }

var q13 = { "testing": { $in: [1,2] } }

var q14 = { "aaa": { $ne: null } }
var q15 = { "aaa": { $eq: null } }

var q16 = { $text: { $search: "prefix:alice" , $field: 'local.username', $limit: 10 } }

console.log(builder('users', q16));

process.exit();
