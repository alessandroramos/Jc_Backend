
exports.up = function(knex, Promise) {
    return knex.schema.createTable('papelaos', table => {
        table.increments('papelaos_id').primary()
        table.date ('papelaosDataCadastro').notNull()
        table.date ('papelaosDataUpdate')
        table.date ('papelaosDataCancel')
        table.date ('papelaosData')
        table.string ('papelaosPeso')
        table.string ('papelaosMaterial')
        table.string ('papelaosResponsavel')
        table.string ('papelaosFinanceiro')
        table.string ('papelaosPrevencao')
        table.string ('papelaosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'papelaos' )
};
