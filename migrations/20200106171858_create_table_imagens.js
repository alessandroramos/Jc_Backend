exports.up = function(knex, Promise) {
    return knex.schema.createTable('imagens', table => {
      table.increments('imagens_id').primary()
      table.date ('imagensDataCadastro').notNull()
      table.time ('imagensHoraCadastro').notNull()
      table.bytea ('imagensImagem')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
      table.integer ('SisRotIdtabela').notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'imagens' )
  };
  