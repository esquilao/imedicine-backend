

module.exports = {

    async authorizate (req, res ) {

        const { id } =  req.body;

        const drugstore = knex('drugstores').where('id', id)

        if(!drugstore) {
            return res.status(400).json('nao achei')
        }
        return alert('boa');
    }          

}