exports.up = knex => knex.schema.alterTable('medicines', table => { 

    table.string('quantity').notNullable();
})

exports.down = function(knex) {
    knex.schema.dropTable('medicines')
};
