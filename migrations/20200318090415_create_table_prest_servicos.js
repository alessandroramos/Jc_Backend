
exports.up = function(knex, Promise) {
    return knex.schema.createTable('prest_servicos', table => {
        table.increments('prest_servicos_id').primary()
        table.date ('prest_servicosDataCadastro').notNull()
        table.date ('prest_servicosDataUpdate')
        table.date ('prest_servicosDataCancel')
        table.date ('prest_servicosHora')
        table.string ('prest_servicosEntSai')
        table.string ('prest_servicosData')
        table.string ('prest_servicosNomePres')
        table.string ('prest_servicosDocumento')
        table.string ('prest_servicosEmpresa')
        table.string ('prest_servicosSolicitante')
        table.string ('prest_servicosResponsavel')
        
        table.string ('prest_servicosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'prest_servicos' )
};
