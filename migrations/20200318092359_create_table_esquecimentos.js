
exports.up = function(knex, Promise) {
    return knex.schema.createTable('esquecimentos', table => {
        table.increments('esquecimentos_id').primary()
        table.date ('esquecimentosDataCadastro').notNull()
        table.date ('esquecimentosDataUpdate')
        table.date ('esquecimentosDataCancel')
        table.string ('esquecimentoCupom')
        table.string ('esquecimentosProduto')
        table.string ('esquecimentosQuantidade')
        table.string ('esquecimentosCodigoBarra')
        table.string ('esquecimentosOperador')
        table.string ('esquecimentosResponsavel')
        table.string ('esquecimentosCliente')
        table.string ('esquecimentosSistema')
        table.string ('esquecimentosPrevencao')
        table.string ('esquecimentosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'esquecimentos' )
};
