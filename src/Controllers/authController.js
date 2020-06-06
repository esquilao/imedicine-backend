const connection = require('../database/connection');

module.exports = {

    async authorizate (req, res) {

        const { id } =  req.body;

        const drugstore = await connection('drugstores')
        .where('drugstore_id', id)
        .select('*')
        .first();
        

        if(!drugstore) {
            return res.status(400).json({error: 'nao achei'})
        }
        return res.json(drugstore);
    },
    
    async getProfile(req, res) {
        
            const id = req.headers.authorization;
            const medicines=  await connection('medicines')
            .where('drugstore_id', id)
            .select('name', 'price', 'product_id');
            
            
    
            if(!medicines) {
                return res.status(500).json({não : 'essa fármacia não tem medicamentos' })
            }
    
            return res.json(medicines.map(medicine => ({
                ...medicine,
                url: 'https://cdn-bifarma3.stoom.com.br/fotos/1572525346929.jpg'
            })));

    }

}