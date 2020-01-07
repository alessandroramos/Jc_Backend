exports.up = function(knex, Promise) {
    return knex.schema.createTable('sensores', table => {
      table.increments('sensores_id').primary()
      table.date ('sensoresDataCadastro').notNull()
      table.date ('sensoresDataUpdate')
      table.date ('sensoresDataCancel')
      table.time ('sensoresHoraCadastro').notNull()
      table.time ('sensoresHoraUpdate')
      table.time ('sensoresHoraCancel')
      table.string ('sensoresLocal')
      table.string ('sensoresEquipamento')
      table.string ('sensoresLimpeza')
      table.string ('sensoresSituacao')
      table.string ('sensoresResponsavel')
      table.string ('sensoresPrevencao')
      table.string ('sensoresObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'sensores' )
  };
  