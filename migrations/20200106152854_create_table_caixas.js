exports.up = function(knex, Promise) {
    return knex.schema.createTable('caixas', table => {
      table.increments('caixas_id').primary()
      table.date ('caixasDataCadastro').notNull()
      table.date ('caixasDataUpdate')
      table.date ('caixasDataCancel')
      table.time ('caixasHoraCadastro').notNull()
      table.time ('caixasHoraUpdate')
      table.time ('caixasHoraCancel')
      table.string ('caixasOperador')
      table.string ('caixasValor')
      table.string ('caixasDifereca')
      table.string ('caixasDocOperador')
      table.string ('caixasDocResponsavel')
      table.string ('caixasDocPrevecao')
      table.string ('caixasObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'caixas' )
  };
  