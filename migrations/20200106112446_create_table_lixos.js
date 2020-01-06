exports.up = function(knex, Promise) {
    return knex.schema.createTable('lixos', table => {
      table.increments('lixos_id').primary()
      table.date ('lixosDataCadastro').notNull()
      table.date ('lixosDataUpdate').notNull()
      table.date ('lixosDataCancel')
      table.time ('lixosHoraCadastro').notNull()
      table.time ('lixosHoraUpdate').notNull()
      table.time ('lixosHoraCancel')
      table.string ('lixosSetor')
      table.string ('lixosIrregularida')
      table.string ('lixosPrevencao')
      table.string ('lixosObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'lixos' )
  };
  