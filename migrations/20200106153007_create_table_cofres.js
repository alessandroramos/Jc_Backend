exports.up = function(knex, Promise) {
    return knex.schema.createTable('cofres', table => {
      table.increments('cofres_id').primary()
      table.date ('cofresDataCadastro').notNull()
      table.date ('cofresDataUpdate')
      table.date ('cofresDataCancel')
      table.time ('cofresHoraCadastro').notNull()
      table.time ('cofresHoraUpdate')
      table.time ('cofresHoraCancel')
      table.string ('cofresValor')
      table.string ('cofresDiferenca')
      table.string ('cofresDocResponsavel')
      table.string ('cofresDocAuditor')
      table.string ('cofresObservacao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'cofres' )
  };
  