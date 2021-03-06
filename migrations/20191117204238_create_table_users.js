
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('users_id').primary()
        table.string('name').notNull()
        table.string ('cpf').notNull().unique()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.date ('dataCadastro').notNull()
        table.date ('dataUpdate').notNull()
        table.date ('dataCancelU')
        table.integer ('pessoa_id').references('pessoas_id').inTable( 'pessoas' ).notNull()
      })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
