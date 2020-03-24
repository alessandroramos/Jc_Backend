
exports.up = function(knex, Promise) {
    return knex.schema.createTable('recuperados', table => {
        table.increments('recuperados_id').primary()
        table.date ('recuperadosDataCadastro').notNull()
        table.date ('recuperadosDataUpdate')
        table.date ('recuperadosDataCancel')
        table.string ('recuperadosQuantidade')
        table.string ('recuperadosValor')
        table.string ('recuperadosPrevencao')
        table.string ('recuperadosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'recuperados' )
};
