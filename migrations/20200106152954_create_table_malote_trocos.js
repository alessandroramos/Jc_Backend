exports.up = function(knex, Promise) {
    return knex.schema.createTable('malote_trocos', table => {
      table.increments('malote_trocos_id').primary()
      table.date ('malote_trocosDataCadastro').notNull()
      table.date ('malote_trocosDataUpdate')
      table.date ('malote_trocosDataCancel')
      table.string ('malote_trocosOperador')
      table.string ('malote_trocosValor')
      table.string ('malote_trocosDocOperador')
      table.string ('malote_trocosResponsavel')
      table.string ('malote_trocosObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'malote_trocos' )
  };
  