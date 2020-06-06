const connection = require('../database/connection');
const uuid = require('uuid');

module.exports = {

    async getAll(req, res) {
        
        const medicines = await connection('medicines')
        .select('*')
        
        
        if(!medicines) {
            return res.json({ não: 'não tem medicamentos'})
        }
        return res.json(medicines)
    },

    async getById(req, res) {
        const {id} = req.params;

        const medicine =  await connection('medicines')
        .where('product_id', id)
        .first()

        if(!medicine) {
            return res.status(500).json({não : 'não tem medicamento com esse id' })
        }

        return res.json(medicine)
    },

    async create (req, res) {

        const product_id = uuid.v4();

        const drugstore_id = req.headers.authorization;

        const {
          name,
          price
        } = req.body;

        await connection('medicines')
        .insert({
          product_id,  
          name,
          price,
          drugstore_id   
        })

        return res.json({ mec : `ta criado o remédio de numero ${product_id}`});
    },
    
    async delete(req, res) {

            const {id} = req.params;

            const response = await connection('medicines')
            .where('product_id', id)
            .delete()
            
            if(!response) {
                return res.status(400).json({sem : 'remédio'})
            }
            return res.json({deletado : `vc deletou o remédio de id ${id}`})
    },
    
    async change(req, res) {

        const drugstore_id = req.headers.authorization;

        const {
            name,
            price,
            product_id
        } = req.body;

        const data = {
            name,
            price,
            product_id
        }

        const dados = Object.entries(data);
        const dadosEmArray= dados.filter( (e) => {
            return e[1] !== null});
            console.log(dadosEmArray)
        const dadosEmJson = dadosEmArray.reduce( (acc, curr) => {
           return {
               ...acc,
            [curr[0]]: curr[1]

        }},{})   
        
            console.log(dadosEmJson);

            await connection('medicines')
            .where('drugstore_id', drugstore_id)
            .where('product_id', product_id)
            .update(dadosEmJson)

            return res.json({ atualizado : 'voce atualizou'})

    }
}