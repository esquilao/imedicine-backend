
exports.up = knex => knex.schema.createTable('medicines', table => {

        table.string('product_id').primary();
        table.text('name').notNullable();
        table.string('price').notNullable();
        table.string('image').notNullable();
        table.uuid('drugstore_id').references('drugstore_id').inTable('drugstores')
}
)


exports.down = function(knex) {
    knex.schema.dropTable('medicines')
};
