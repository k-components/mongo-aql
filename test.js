var builder = require('./');
var usersQuery = {
	type: 'select',
	table: 'users',
	alias: 'u',
	where: {
		age: 55,
	},
	limit: 3,
	order: { name: -1 },
	embed: [ { key: "city", collection: "cities" }, { key: "like", collection: "likes" } ],
	return: true
};

var q2 = {
	foo: { bar: 'baz', bar2: 'baz2' },
	"$limit": 10,
	"$skip": 100,
	"$orderby": { name: 1, name2: 1 },
	"@city": "cities",
	"@like": "likes"
}

console.log();
var res = builder('users', q2);

console.log();
console.log(res);
console.log();
process.exit();