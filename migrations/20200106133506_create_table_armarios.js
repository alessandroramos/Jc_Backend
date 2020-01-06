exports.up = function(knex, Promise) {
    return knex.schema.createTable('armarios', table => {
      table.increments('armarios_id').primary()
      table.date ('armariosDataCadastro').notNull()
      table.date ('armariosDataUpdate').notNull()
      table.date ('armariosDataCancel')
      table.time ('armariosHoraCadastro').notNull()
      table.time ('armariosHoraUpdate').notNull()
      table.time ('armariosHoraCancel')
      table.string ('armariosIdentificador')
      table.string ('armariosColaborador')
      table.string ('armariosDocColaborador')
      table.string ('armariosPrevencao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'armarios' )
  };
  