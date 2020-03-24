
exports.up = function(knex, Promise) {
    return knex.schema.createTable('acerto_caixas', table => {
        table.increments('acerto_caixas_id').primary()
        table.date ('acerto_caixasDataCadastro').notNull()
        table.date ('acerto_caixasDataUpdate')
        table.date ('acerto_caixasDataCancel')
        table.string ('acerto_caixasMotivo')
        table.string ('acerto_caixasDiferenca')
        table.string ('acerto_caixasOperador')
        table.string ('acerto_caixasAuditor')
        table.string ('acerto_caixasResponsavel')
        table.string ('acerto_caixasObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'acerto_caixas' )
};
