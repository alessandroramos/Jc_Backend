exports.up = function(knex, Promise) {
    return knex.schema.createTable('extintores', table => {
      table.increments('extintores_id').primary()
      table.date ('extintoresDataCadastro').notNull()
      table.date ('extintoresDataUpdate').notNull()
      table.date ('extintoresDataCancel')
      table.time ('extintoresHoraCadastro').notNull()
      table.time ('extintoresHoraUpdate').notNull()
      table.time ('extintoresHoraCancel')
      table.string ('extintoresLocal')
      table.string ('extintoresCarga')
      table.string ('extintoresLimpeza')
      table.string ('extintoresPressao')
      table.string ('extintoresValidade')
      table.string ('extintoresLacre')
      table.string ('extintoresPrevencao')
      table.string ('extintoresObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'extintores' )
  };
  