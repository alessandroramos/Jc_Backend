
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sistemas', table => {
      table.increments('id').primary()
      table.integer('codigo').notNull().unique()
      table.string ('nomeSistema').notNull().unique()
      table.date ('dataImplantacao').notNull()
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdate').notNull()
      table.date ('dataCancel')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'sistemas' )
  };
  