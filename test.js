var builder = require('./');
var usersQuery = {
	type: 'select',
	table: 'users',
	alias: 'u',
	where: {
		$or: { id: 5, name: 'Bob' },
		joo: { $gte: 4 },
		pim: "pim"
	},
	limit: 3,
	order: { pim: -1 }
};

console.log();
var res = builder.sql(usersQuery);

console.log();
console.log(res);
console.log();
process.exit();