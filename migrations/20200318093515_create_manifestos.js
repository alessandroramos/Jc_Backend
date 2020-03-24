
exports.up = function(knex, Promise) {
    return knex.schema.createTable('manifestos', table => {
        table.increments('manifestos_id').primary()
        table.date ('manifestosDataCadastro').notNull()
        table.date ('manifestosDataUpdate')
        table.date ('manifestosDataCancel')
        table.date ('manifestosHoraInicial')
        table.date ('manifestoshoraFinal')
        table.string ('manifestosOrigem')
        table.string ('manifestosDestino')
        table.string ('manifestosLacre')
        table.string ('manifestosFiscal')
        table.string ('manifestosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'manifestos' )
};
