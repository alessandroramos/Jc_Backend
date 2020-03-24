
exports.up = function(knex, Promise) {
    return knex.schema.createTable('agendamentos', table => {
        table.increments('agendamentos_id').primary()
        table.date ('agendamentosDataCadastro').notNull()
        table.date ('agendamentosDataUpdate')
        table.date ('agendamentosDataCancel')

        table.date ('agendamentosDataAgendamento')
        table.date ('agendamentosHoraAgendamento')
        table.string ('agendamentosVolume')
        table.string ('agendamentosFornecedor')
        table.string ('agendamentosCPD')
        table.string ('agendamentosEntSai')
        table.date ('agendamentosDataExecu')
        table.date ('agendamentosHoraExecu')
        
        table.string ('agendamentosConferencia')
        table.string ('agendamentosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'agendamentos' )
};
