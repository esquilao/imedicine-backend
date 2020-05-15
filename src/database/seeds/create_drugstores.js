
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('drugstores').del()
    .then(function () {
      // Inserts seed entries
      return knex('drugstores').insert([
        { drugstore_id: 1, name: 'farmacia que testa', email: 'farmacia_teste@gmail' , Whatsapp: '0800-9999', 
        city: 'campinas' , state: 'SP', address: 'rua fodace'
      },

        {drugstore_id: 2, name: 'farmacia que testa 2', email: 'farmacia_teste@gmail' , Whatsapp: '0800-9999', 
        city: 'campinas' , state: 'SP', address: 'rua fodace'}

      ]);
    });
};
