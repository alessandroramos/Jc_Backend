exports.up = function(knex, Promise) {
    return knex.schema.createTable('notas', table => {
      table.increments('notas_id').primary()
      table.date ('notasDataCadastro').notNull()
      table.date ('notasDataUpdate').notNull()
      table.date ('notasDataCancel')
      table.time ('notasHoraCadastro').notNull()
      table.time ('notasHoraUpdate').notNull()
      table.time ('notasHoraCancel')
      table.string ('notasNumero')
      table.string ('notasObs')
      table.string ('notasQuantidade')
      table.string ('notasPrevencao')
      table.string ('notasObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'notas' )
  };
  