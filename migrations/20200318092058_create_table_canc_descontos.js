
exports.up = function(knex, Promise) {
    return knex.schema.createTable('canc_descontos', table => {
        table.increments('canc_descontos_id').primary()
        table.date ('canc_descontosDataCadastro').notNull()
        table.date ('canc_descontosDataUpdate')
        table.date ('canc_descontosDataCancel')
        table.string ('canc_descontosDocNum')
        table.string ('canc_descontosValor')
        table.string ('canc_descontosOperador')
        table.string ('canc_descontosMotivo')
        table.string ('canc_descontosResponsavel')
        table.string ('canc_descontosPrevencao')
        table.string ('canc_descontosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'canc_descontos' )
};
