
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cancelamentos', table => {
        table.increments('cancelamentos_id').primary()
        table.date ('cancelamentosDataCadastro').notNull()
        table.date ('cancelamentosDataUpdate')
        table.date ('cancelamentosDataCancel')
        table.string ('cancelamentosDocNum')
        table.string ('cancelamentosValor')
        table.string ('cancelamentosOperador')
        table.string ('cancelamentosMotivo')
        table.string ('cancelamentosResponsavel')
        table.string ('cancelamentosPrevencao')
        table.string ('cancelamentosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'cancelamentos' )
};
