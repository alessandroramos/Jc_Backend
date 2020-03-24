
exports.up = function(knex, Promise) {
    return knex.schema.createTable('epis', table => {
        table.increments('epis_id').primary()
        table.date ('episDataCadastro').notNull()
        table.date ('episDataUpdate')
        table.date ('episDataCancel')
        table.string ('episRetirada')
        table.string ('episDevolucao')
        table.string ('episQuantidade')
        table.string ('episUnidade')
        table.string ('episDescEquipamneto')
        table.string ('episNumCA')
        table.string ('episColaborador')
        table.string ('episResponsavel')
        table.string ('episObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'epis' )
};
