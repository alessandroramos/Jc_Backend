exports.up = function(knex, Promise) {
    return knex.schema.createTable('selos', table => {
      table.increments('selos_id').primary()
      table.date ('selosDataCadastro').notNull()
      table.date ('selosDataUpdate').notNull()
      table.date ('selosDataCancel')
      table.time ('selosHoraCadastro').notNull()
      table.time ('selosHoraUpdate').notNull()
      table.time ('selosHoraCancel')
      table.string ('selosSetor')
      table.string ('selosProduto')
      table.string ('selosQuantidade')
      table.string ('selosPrevencao')
      table.string ('selosObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'selos' )
  };
  