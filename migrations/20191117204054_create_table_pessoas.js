
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pessoas', table => {
      table.increments('pessoas_id').primary()
      table.string ('nome').notNull()
      table.string ('apelido')
      table.string ('cpf').notNull().unique()
      table.string ('rg').notNull().unique()
      table.date ('dataNacimento').notNull()
      table.date ('dataCadastro').notNull()
      table.date ('dataUpdate').notNull()
      table.date ('dataCancel')
      table.string ('logradoro')
      table.string ('numero')
      table.string ('bairro')
      table.string ('cidade')
      table.string ('uf')
      table.string ('cep')
      table.string ('telefone')
      table.string ('celular')
      table.string ('mail').notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable( 'pessoas' )
  };
  