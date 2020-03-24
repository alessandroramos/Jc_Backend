
exports.up = function(knex, Promise) {
    return knex.schema.createTable('transferencias', table => {
        table.increments('transferencias_id').primary()
        table.date ('transferenciasDataCadastro').notNull()
        table.date ('transferenciasDataUpdate')
        table.date ('transferenciasDataCancel')
        table.date ('transferenciasData')
        table.date ('transferenciasHora')
        table.string ('transferencias')
        table.string ('transferenciasNota')
        table.string ('transferenciasMotorista')
        table.string ('transferenciasSeparador')
        table.string ('transferenciasConferente')
        table.string ('transferenciasPrevencao')
        table.string ('transferenciasObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'transferencias' )
};
