
exports.up = function(knex, Promise) {
    return knex.schema.createTable('acessos', table => {
      table.increments('id').primary()
      table.boolean ('cancel')
      table.date ('dataImplantação').notNull()
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdate').notNull()
      table.integer ('userId').references('id').inTable( 'users' ).notNull()
      table.integer ('sistemaId').references('id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinaId').references('id').inTable( 'rotinas' ).notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'acessos' )
  };
  