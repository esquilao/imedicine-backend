
exports.up = knex => knex.schema.createTable('drugstores', table => {
    table.uuid('drugstore_id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.text('name').notNullable();
    table.string('image').notNullable();
    table.string('whatsapp', 11).notNullable();
    table.text('city').notNullable();
    table.text('state', 2).notNullable();
    table.text('address').notNullable();

})

exports.down = (knex) =>  { 

knex.schema.dropTable('drugstores');

}

