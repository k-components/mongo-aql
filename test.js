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

console.log();
var res = builder.sql(usersQuery);

console.log();
console.log(res);
console.log();
process.exit();