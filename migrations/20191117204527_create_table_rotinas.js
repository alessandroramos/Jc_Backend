
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rotinas', table => {
      table.increments('id').primary()
      table.string ('nomeRotina').notNull().unique()
      table.boolean ('cancel')
      table.date ('dataImplantação').notNull()
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdate').notNull()
      table.date ('dataCancel')
      table.integer ('sistema_id').references('id').inTable( 'sistemas' ).notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'rotinas' )
  };
  