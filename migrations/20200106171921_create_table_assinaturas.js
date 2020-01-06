exports.up = function(knex, Promise) {
  return knex.schema.createTable('assinaturas', table => {
    table.increments('assinaturas_id').primary()
    table.date ('assinaturasDataCadastro').notNull()
    table.time ('assinaturasHoraCadastro').notNull()
    table.bytea ('assinaturasImagem')
    table.integer('tipo')
    table.integer ('sistemas_id').references('sistemas_id').inTable( 'sistemas' ).notNull()
    table.integer ('rotinas_id').references('rotinas_id').inTable( 'rotinas' ).notNull()
    table.integer ('users_id').references('users_id').inTable( 'users' ).notNull()
    table.integer ('SisRotIdtabela').notNull()
  })
};  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'assinaturas' )
};
