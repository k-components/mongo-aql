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
	link: [ { key: "city", collection: "cities" }, { key: "like", collection: "likes" } ],
	return: true
};

var q2 = {
	age: 55,
	"$limit": 3,
	"$orderby": { name: 1 },
	"@city": "cities",
	"@like": "likes"
}

console.log();
var res = builder('users', q2);

console.log();
console.log(res);
console.log();
process.exit();