
exports.up = function(knex, Promise) {
    return knex.schema.createTable('acesso_tesourarias', table => {
        table.increments('acesso_tesourarias_id').primary()
        table.date ('acesso_tesourariasDataCadastro').notNull()
        table.date ('acesso_tesourariasDataUpdate')
        table.date ('acesso_tesourariasDataCancel')
        table.date ('acesso_tesourariasHora')
        table.string ('acesso_tesourariasNome')
        table.string ('acesso_tesourariasDocumento')
        table.string ('acesso_tesourariasMotivo')
        table.string ('acesso_tesourariasAuditor')
        table.string ('acesso_tesourariasResponsavel')
        table.string ('acesso_tesourariasObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'acesso_tesourarias' )
};
