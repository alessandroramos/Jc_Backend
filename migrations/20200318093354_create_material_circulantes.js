
exports.up = function(knex, Promise) {
    return knex.schema.createTable('material_circulantes', table => {
        table.increments('material_circulantes_id').primary()
        table.date ('material_circulantesDataCadastro').notNull()
        table.date ('material_circulantesDataUpdate')
        table.date ('material_circulantesDataCancel')
        table.string ('material_circulantesEquipamento')
        table.string ('material_circulantesObservacao')  
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable( 'material_circulantes' )
};
