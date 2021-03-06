
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rotinas', table => {
      table.increments('rotinas_id').primary()
      table.string ('nomeRotina').notNull()
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdate').notNull()
      table.date ('dataCancelR')
      table.integer ('sistema_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'rotinas' )
  };