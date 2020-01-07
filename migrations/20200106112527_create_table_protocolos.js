exports.up = function(knex, Promise) {
    return knex.schema.createTable('protocolos', table => {
      table.increments('protocolos_id').primary()
      table.date ('protocolosDataCadastro').notNull()
      table.date ('protocolosDataUpdate')
      table.date ('protocolosDataCancel')
      table.time ('protocolosHoraCadastro').notNull()
      table.time ('protocolosHoraUpdate')
      table.time ('protocolosHoraCancel')
      table.string ('protocolosLacre')
      table.string ('protocolosDocEqui')
      table.string ('protocolosMotorista')
      table.string ('protocolosDocMotorista')
      table.string ('protocolosrecebimento')
      table.string ('protocolosExpedicao')
      table.string ('protocolosPrevencao')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'protocolos' )
  };
  