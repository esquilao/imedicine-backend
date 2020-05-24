
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('medicines').del()
    .then(function () {
      // Inserts seed entries
      return knex('medicines').insert([
        {product_id: 1, name: ' remédio 1', price: 'R$ 8,00', 
        drugstore_id: '7a175644-57e5-4a23-b475-07a1448bc6ab' },
        {product_id: 2, name: 'remédio 2' , price: 'R$ 5,00',
         drugstore_id: '8b98f49e-296a-4b61-b0e6-174185a14e43' }
      ]);
    });
};
