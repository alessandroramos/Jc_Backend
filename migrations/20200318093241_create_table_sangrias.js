
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sangrias', table => {
        table.increments('sangrias_id').primary()
        table.date ('sangriasDataCadastro').notNull()
        table.date ('sangriasDataUpdate')
        table.date ('sangriasDataCancel')
        table.string ('sangriasEnvelope')
        table.string ('sangriasValor')
        table.string ('sangriasOperador')
        table.string ('sangriasResponsavel')
        table.string ('sangriasPrevencao')
        table.string ('sangriasObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'sangrias' )
};
