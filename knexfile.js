module.exports = {
	client: 'postgresql',
	connection: {
		host: '34.95.207.16',
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
