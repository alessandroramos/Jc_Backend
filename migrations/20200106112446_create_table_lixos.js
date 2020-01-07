exports.up = function(knex, Promise) {
    return knex.schema.createTable('lixos', table => {
      table.increments('lixos_id').primary()
      table.date ('lixosDataCadastro').notNull()
      table.date ('lixosDataUpdate')
      table.date ('lixosDataCancel')
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
  