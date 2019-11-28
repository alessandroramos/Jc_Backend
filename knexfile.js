module.exports = {
	client: 'postgresql',
	connection: {
		database: 'jc',
		user: 'postgres',
		password: 'salete06'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};
