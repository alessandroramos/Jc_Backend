
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rotinas', table => {
      table.increments('rotinas_id').primary()
      table.string ('nomeRotina').notNull().unique()
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdate').notNull()
      table.date ('dataCancel')
      table.integer ('sistema_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'rotinas' )
  };
  