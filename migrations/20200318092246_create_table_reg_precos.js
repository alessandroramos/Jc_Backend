
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reg_precos', table => {
        table.increments('reg_precos_id').primary()
        table.date ('reg_precosDataCadastro').notNull()
        table.date ('reg_precosDataUpdate')
        table.date ('reg_precosDataCancel')
        table.string ('reg_precosCodigoBarra')
        table.string ('reg_precosProduto')
        table.string ('reg_precosPrecoAtual')
        table.string ('reg_precosPrecoNovo')
        table.string ('reg_precosPeriodo')
        table.string ('reg_precosMotivo')
        table.string ('reg_precosSolicitante')
        table.string ('reg_precosResponsavel')
        table.string ('reg_precosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'reg_precos' )
};
