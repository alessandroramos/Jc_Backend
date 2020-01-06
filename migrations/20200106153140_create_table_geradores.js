exports.up = function(knex, Promise) {
    return knex.schema.createTable('geradores', table => {
      table.increments('geradores_id').primary()
      table.date ('geradoresDataCadastro').notNull()
      table.date ('geradoresDataUpdate').notNull()
      table.date ('geradoresDataCancel')
      table.time ('geradoresHoraCadastro').notNull()
      table.time ('geradoresHoraUpdate').notNull()
      table.time ('geradoresHoraCancel')
      table.string ('geradoresAguaRadiador')
      table.string ('geradoresOleoMotor')
      table.string ('geradoresCombustivel')
      table.string ('geradoresCondicoes')
      table.string ('geradoresResponsavel')
      table.string ('geradoresPrevencao')
      table.string ('geradoresObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'geradores' )
  };
  