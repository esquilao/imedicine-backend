const connection = require('../database/connection');

module.exports = {

    async authorizate(req, res) {

        const { email, password } = req.body;

        const drugstore = await connection('drugstores')
            .where('email', email)
            .where('password', password)
            .select('*')
            .first();


        if (!drugstore) {
            return res.status(400).json({ error: 'nao achei' })
        }
        return res.json(drugstore);
    }, 
    
    async getProfile(req, res) {

            const id = req.headers.authorization;

            const medicines=  await connection('medicines')
            .where('drugstore_id', id)
            .select('name', 'price', 'product_id', 'image');
            
            if(!medicines) {
                return res.status(500).json({não : 'essa fármacia não tem medicamentos' })
            }
    
            return res.json(medicines);

    },
    
    async getDrugstoreImage(req, res) {

        const id = req.headers.authorization;

        const image = await connection('drugstores')
            .where('drugstore_id', id)
            .select('image');

            return res.json(image);
    },

    async HandleRequest(req, res) {

        const {
            email,
            name,
            address
        } = req.body

        const result = await connection('drugstores')
        .where({'email' : email ,
                'name' : name ,
                'address': address})
        .select('email')
        
        if(result.length === 0) {
            return res.status(500).send({error : 'informações inválidas'})
        }
        else {
            return res.json({ta : 'bala'})
        }
    }

}