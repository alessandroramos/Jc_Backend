
exports.up = function(knex, Promise) {
    return knex.schema.createTable('controle_furtos', table => {
        table.increments('controle_furtos_id').primary()
        table.date ('controle_furtosDataCadastro').notNull()
        table.date ('controle_furtosDataUpdate')
        table.date ('controle_furtosDataCancel')
        table.string ('controle_furtosProduto')
        table.string ('controle_furtosQuantidade')
        table.string ('controle_furtosValor')
        table.string ('controle_furtosNome')
        table.string ('controle_furtosEndereco')
        table.string ('controle_furtosNumero')
        table.string ('controle_furtosBairro')
        table.string ('controle_furtosCidade')
        table.string ('controle_furtosDataNasc')
        table.string ('controle_furtosCPF')
        table.string ('controle_furtosLocalNasc')
        table.string ('controle_furtosRG')
        table.string ('controle_furtosTotal')
        table.string ('controle_furtosFiscal')
        table.string ('controle_furtosPrevencao')
        table.string ('controle_furtosObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'controle_furtos' )
};
