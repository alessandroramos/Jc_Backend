exports.up = function(knex, Promise) {
    return knex.schema.createTable('validades', table => {
      table.increments('validades_id').primary()
      table.date ('validadesDataCadastro').notNull()
      table.date ('validadesDataUpdate')
      table.date ('validadesDataCancel')
      table.string ('validadesDescProduto')
      table.string ('validadesQuantidade')
      table.string ('validadesCodigoBarra')
      table.string ('validadesPrecoCusto')
      table.string ('validadesPrecoVenda')
      table.string ('validadesDataVencimento')
      table.string ('validadesResponsavel')
      table.string ('validadesResponsavelComercial')
      table.string ('validadesAcao')
      table.string ('validadesResultado')
      table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
      table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
      table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    })
  };  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'validades' )
  };
  