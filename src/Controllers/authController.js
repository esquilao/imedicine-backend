const connection = require('../database/connection');

module.exports = {

    async authorizate (req, res) {

        const { id } =  req.body;

        const drugstore = await connection('drugstores')
        .where('drugstore_id', id)
        .select('*')
        .first();
        

        if(!drugstore) {
            return res.status(400).json({nao : 'nao achei'})
        }
        return res.json(drugstore);
    }          

}