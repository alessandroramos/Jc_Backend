
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sistemas', table => {
      table.increments('sistemas_id').primary()
      table.integer('sistemas_codigo').notNull().unique()
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
  