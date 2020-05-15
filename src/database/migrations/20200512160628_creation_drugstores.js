
exports.up = knex => knex.schema.createTable('drugstores', table => {
    table.increments('drugstore_id').primary();
    table.text('name').notNullable();
    table.string('email').notNullable();
    table.string('Whatsapp').notNullable();
    table.text('city').notNullable();
    table.text('state').notNullable();
    table.text('address').notNullable();
}
)

exports.down = (knex) =>  { 
    
knex.schema.dropTable('drugstores');

}

