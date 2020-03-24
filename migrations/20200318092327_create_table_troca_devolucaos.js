
exports.up = function(knex, Promise) {
    return knex.schema.createTable('troca_devolucaos', table => {
        table.increments('troca_devolucaos_id').primary()
        table.date ('troca_devolucaosDataCadastro').notNull()
        table.date ('troca_devolucaosDataUpdate')
        table.date ('troca_devolucaosDataCancel')
        table.string ('troca_devolucaosDocNum')
        table.string ('troca_devolucaosProduto')
        table.string ('troca_devolucaosQuantidade')
        table.string ('troca_devolucaosCodigoBarra')
        table.string ('troca_devolucaosOperador')
        table.string ('troca_devolucaosResponsavel')
        table.string ('troca_devolucaosSistema')
        table.string ('troca_devolucaosPrevencao')
        table.string ('troca_devolucaosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'troca_devolucaos' )
};
