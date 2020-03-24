
exports.up = function(knex, Promise) {
    return knex.schema.createTable('patrimonios', table => {
        table.increments('patrimonios_id').primary()
        table.date ('patrimoniosDataCadastro').notNull()
        table.date ('patrimoniosDataUpdate')
        table.date ('patrimoniosDataCancel')
        table.date ('patrimoniosDataAquisicao')
        table.string ('patrimoniosNota')
        table.string ('patrimoniosEquipamento')
        table.string ('patrimoniosnumSerie')
        table.string ('patrimoniosModelo')
        table.string ('patrimoniosSetor')
        table.string ('patrimoniosLocal')
        table.string ('patrimoniosResponsavel')
        table.string ('patrimoniosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'patrimonios' )
};
