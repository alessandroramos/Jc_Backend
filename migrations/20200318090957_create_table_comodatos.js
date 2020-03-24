
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comodatos', table => {
        table.increments('comodatos_id').primary()
        table.date ('comodatosDataCadastro').notNull()
        table.date ('comodatosDataUpdate')
        table.date ('comodatosDataCancel')
        table.date ('comodatosData')
        table.date ('comodatosHora')
        table.string ('comodatosFornecedor')
        table.string ('comodatosNota')
        table.string ('comodatosEquipamento')
        table.string ('comodatosQuantidade')
        table.string ('comodatosPrevencao')
        table.string ('comodatosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'comodatos' )
};
