
exports.up = function(knex, Promise) {
    return knex.schema.createTable('recebimentos', table => {
        table.increments('recebimentos_id').primary()
        table.date ('recebimentosDataCadastro').notNull()
        table.date ('recebimentosDataUpdate')
        table.date ('recebimentosDataCancel')
        table.date ('recebimentosData')
        table.string ('recebimentosFornecedor')
        table.string ('recebimentosMotorista')
        table.date ('recebimentosHoraEntrada')
        table.date ('recebimentosHoraSaida')
        table.date ('recebimentosHoraNota')
        table.string ('recebimentosPlacaVeic')
        table.string ('recebimentosNotaFiscal')
        table.integer ('recebimentosTemperatura')
        table.string ('recebimentosIrregDescProd')
        table.string ('recebimentosIrregCodigo')
        table.string ('recebimentosIrregDiferenca')
        table.string ('recebimentosIrregCodDecisao')
        table.string ('recebimentosRecebedor')
        table.string ('recebimentosConferente')
        table.string ('recebimentosPrevencao')
        table.string ('recebimentosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'recebimentos' )
};
