
exports.up = function(knex, Promise) {
    return knex.schema.createTable('emprestimos', table => {
        table.increments('emprestimos_id').primary()
        table.date ('emprestimosDataCadastro').notNull()
        table.date ('emprestimosDataUpdate')
        table.date ('emprestimosDataCancel')
        table.string ('emprestimosEquipamento')
        table.string ('emprestimosRetiradaDevolucao')
        table.string ('emprestimosQuantidade')
        table.string ('emprestimosCondicoes')
        table.string ('emprestimosEmpresa')
        table.string ('emprestimosResponsavel')
        table.string ('emprestimosPrevencao')
        table.string ('emprestimosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'emprestimos' )
};
