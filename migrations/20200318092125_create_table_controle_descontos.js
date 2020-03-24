
exports.up = function(knex, Promise) {
    return knex.schema.createTable('controle_descontos', table => {
        table.increments('controle_descontos_id').primary()
        table.date ('controle_descontosDataCadastro').notNull()
        table.date ('controle_descontosDataUpdate')
        table.date ('controle_descontosDataCancel')
        table.string ('controle_descontosNumDoc')
        table.string ('controle_descontosValor')
        table.string ('controle_descontosMotivo')
        table.string ('controle_descontosFiscal')
        table.string ('controle_descontosPrevencao')
        table.string ('controle_descontosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'controle_descontos' )
};
