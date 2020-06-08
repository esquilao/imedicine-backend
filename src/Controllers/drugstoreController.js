const connection = require('../database/connection');
const uuid = require('uuid');
const multer = require('multer');

module.exports = {
    
    async create(req, res) {
        
        const drugstore_id = uuid.v4();
        const image = req.file;
        
        const {
            name,
            email,
            whatsapp,
            city,
            state,
            address,
            } = req.body;
            
        await connection('drugstores').insert({
            drugstore_id,
            name,
            email,
            image : image.path,
            whatsapp,
            city,
            state,
            address,
        })
        
        return res.json({drugstore_id});
        
    },

    async getById(req, res){
       const {id}  = req.params;

       const index = await connection('drugstores')
       .select('*').where('drugstore_id', id)
        
        if(!index) {
            return res.status(500).json({error : 'Não tem farmácias cadastradas'})
        }
        return res.json(index)
    },

    async getAll(req,res) {
        
        const index = await connection('drugstores')
        .select('*')
         
         if(!index) {
             return res.status(500).json({error : 'Não tem farmácias cadastradas'})
         }
         return res.json(index)
    },

    async delete(req,res) {
        const {id} = req.params;

        const del = await connection('drugstores')
        .where('drugstore_id', id)
        .delete()

        if(!del){
            return res.status(500).json({error : 'Não tem fármacia com esse id'})
        }
        return res.json({ deletado : 'você deletou uma fármacia'})
    },

    async change(req, res) {
        
        const {id} = req.params;
        
        const {
            name,
            email,
            whatsapp,
            city, 
            state,
            address,
        } = req.body;
        
        const data = {
            name,
            email,
            whatsapp,
            city, 
            state,
            address,
        }

        const entries = Object.entries(data);
       
       const filteredEntries =  entries.filter( (en) => {
            return en[1] != null;
        })
        console.log(filteredEntries);
        const objeto = filteredEntries.reduce( (acc , curr) => {
            return {
                ...acc,
                [curr[0]]: curr[1] 
             }

        },{})
        console.log(objeto)

        const drugstore = await connection('drugstores')
        .select('*')
        .where('drugstore_id', id)
        .first()

        if(!drugstore) {
            return res.status(404).json({ error : "não achou"})
        }

        const updatedDrugstore = {
            ...drugstore,
            ...objeto
        }

        const result = await connection('drugstores')
        .update(updatedDrugstore)
        .where('drugstore_id', id);

        

        if(!result) {
            return res.status(500).json({errou : "nós erramos" })
        }
        return res.json([drugstore, updatedDrugstore]);
    }
}