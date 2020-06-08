
exports.up = knex => knex.schema.table('medicines', table => {
    table.string('image').notNullable();
});

exports.down = function(knex) {
  
};
