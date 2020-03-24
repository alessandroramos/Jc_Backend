
exports.up = function(knex, Promise) {
    return knex.schema.createTable('doacaos', table => {
        table.increments('doacaos_id').primary()
        table.date ('doacaosDataCadastro').notNull()
        table.date ('doacaosDataUpdate')
        table.date ('doacaosDataCancel')
        table.date ('doacaosData')
        table.date ('doacaosHora')
        table.string ('doacaosNota')
        table.string ('doacaosEntidade')
        table.string ('doacaosSetor')
        table.string ('doacaosProduto')
        table.string ('doacaosQuantidade')
        table.string ('doacaosResponsavel')
        table.string ('doacaosConferente')
        table.string ('doacaosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'doacaos' )
};
