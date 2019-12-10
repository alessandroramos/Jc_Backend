
exports.up = function(knex, Promise) {
    return knex.schema.createTable('empresas', table => {
      table.increments('id').primary()
      table.string ('razao').notNull()
      table.string ('fantasia')
      table.string ('cnpj').notNull().unique()
      table.date ('dataAbertura').notNull()
      table.date ('dodataEncerramentone')
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdate').notNull()
      table.date ('dataCancel')
      table.string ('logradoro')
      table.string ('numero')
      table.string ('bairro')
      table.string ('cidade')
      table.string ('cep')
      table.string ('telefone')
      table.string ('mail').notNull()
      table.string ('responsavel')
      table.string ('contato')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'empresas' )
  };
  