
exports.up = function(knex, Promise) {
    return knex.schema.createTable('temperaturas', table => {
        table.increments('temperaturas_id').primary()
        table.date ('temperaturasDataCadastro').notNull()
        table.date ('temperaturasDataUpdate')
        table.date ('temperaturasDataCancel')

        table.string ('temperaturasSetor')
        table.string ('temperaturasEquipamento')
        table.integer ('temperaturasTempIdeal')
        table.date ('temperaturasHora')
        table.integer ('temperaturasTemperatura')
        table.string ('temperaturasResponsavel')
        
        table.string ('temperaturasPrevencao')
        table.string ('temperaturasObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'temperaturas' )
};
