
exports.up = function(knex, Promise) {
    return knex.schema.createTable('acessoemps', table => {
      table.increments('acessoemps_id').primary()
      table.date ('dataImplantação').notNull()
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdateAE').notNull()
      table.date ('dataCancelAE')
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
      table.integer ('empresas_id').references('empresas_id').inTable( 'empresas' ).notNull()
      table.integer ('useEmp').notNull().unique()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'acessoemps' )
  };
  