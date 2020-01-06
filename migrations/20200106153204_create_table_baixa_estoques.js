exports.up = function(knex, Promise) {
    return knex.schema.createTable('baixa_estoques', table => {
      table.increments('baixa_estoques_id').primary()
      table.date ('baixa_estoquesDataCadastro').notNull()
      table.date ('baixa_estoquesDataUpdate').notNull()
      table.date ('baixa_estoquesDataCancel')
      table.time ('baixa_estoquesHoraCadastro').notNull()
      table.time ('baixa_estoquesHoraUpdate').notNull()
      table.time ('baixa_estoquesHoraCancel')
      table.string ('baixa_estoquesDescProduto')
      table.string ('baixa_estoquesQuantidade')
      table.string ('baixa_estoquesCodigoBarra')
      table.string ('baixa_estoquesCodigoBaixa')
      table.string ('baixa_estoquesResponsavel')
      table.string ('baixa_estoquesResponsavelSit')
      table.string ('baixa_estoquesPrevencao')
      table.string ('baixa_estoquesObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'baixa_estoques' )
  };
  