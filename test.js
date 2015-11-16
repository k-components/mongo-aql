var builder = require('./');

var q = {
	foo: { bar: 'baz', bar2: 'baz2' },
	"$limit": 10,
	"$skip": 100,
	"$orderby": { name: 1, name2: 1 },
	"@city": "cities",
	"@like": "likes"
}

var res = builder('users', q);
console.log(res);
process.exit();
