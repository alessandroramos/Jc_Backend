
  exports.up = function(knex, Promise) {
    return knex.schema.createTable('localizacaos', table => {
      table.increments('localizacaos_id').primary()
      table.date ('localizacaosDataCadastro').notNull()
      table.time ('localizacaosHoraCadastro').notNull()
      table.string ('localizacaosLatitude')
      table.string ('localizacaosLongitude')
      table.string ('localizacaosAltitude')
      table.string ('localizacaosAccuracy')
      table.string ('localizacaosSpeed')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
      table.integer ('SisRotIdtabela').notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'localizacaos' )
  };
  
  