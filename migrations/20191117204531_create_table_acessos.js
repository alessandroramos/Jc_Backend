
exports.up = function(knex, Promise) {
    return knex.schema.createTable('acessos', table => {
      table.increments('acessos_id').primary()
      table.date ('dataImplantação').notNull()
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdate').notNull()
      table.integer ('userId').references('users_id').inTable( 'users' ).notNull()
      table.integer ('sistemaId').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinaId').references('rotinas_id').inTable( 'rotinas' ).notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'acessos' )
  };
  