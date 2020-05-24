
exports.up = knex => knex.schema.createTable('drugstores', table => {
    table.uuid('drugstore_id').primary();
    table.text('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.text('city').notNullable();
    table.text('state', 2).notNullable();
    table.text('address').notNullable();

})

exports.down = (knex) =>  { 

knex.schema.dropTable('drugstores');

}

