
exports.up = knex => knex.schema.createTable('medicines', table => {

        table.string('product_id').primary();
        table.text('name').notNullable();
        table.string('price').notNullable();
        table.text('belongs_to').references('name').inTable('drugstores')
}
)


exports.down = function(knex) {
    knex.schema.dropTable('medicines')
};
