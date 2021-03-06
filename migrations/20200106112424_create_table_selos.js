exports.up = function(knex, Promise) {
    return knex.schema.createTable('selos', table => {
      table.increments('selos_id').primary()
      table.date ('selosDataCadastro').notNull()
      table.date ('selosDataUpdate')
      table.date ('selosDataCancel')
      table.string ('selosSetor')
      table.string ('selosProduto')
      table.string ('selosQuantidade')
      table.string ('selosPrevencao')
      table.string ('selosObservacao')
      table.string ('selosResponsavel')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'selos' )
  };
  