const connection = require('../database/connection');
const uuid = require('uuid');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const imgurApi = require('../services/imgurApi/api');

module.exports = {
    
    async create(req, res) {
        
        const data = new FormData();
        
        data.append('image', fs.createReadStream(req.file.path));
        
        const response = await imgurApi.post( '/3/upload', data , { headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}` , 
            "Authorization" : "Client-ID f573d680751f416"
        }})

        const drugstore_id = uuid.v4();
        
        const {
            email,
            password,
            name,
            whatsapp,
            city,
            state,
            address,
            } = req.body;
            
            
        const validate  = await connection('drugstores')
        .where('email', email)
        .select('name')
        console.log(validate.length)

        if(validate.length === 0) { 
        await connection('drugstores').insert({
            drugstore_id,
            email,
            password,
            name,
            image : response.data.data.link,
            whatsapp,
            city,
            state,
            address, 
        })
        return res.json({bala : 'bullet'});
    }
    else {
        return res.status(500).send({erro : 'email invalido'})
    } 
    },

    async getByName(req, res){
       const {name}  = req.params;

       const index = await connection('drugstores')
       .select('*')
       .where('name', name)
        
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

    async deleteAll(req, res) {

        const del = await connection('drugstores')
        .delete('*')

        if(!del){
            return res.status(500).json({error : 'Não tem fármacia'})
        }
        return res.json({ deletado : 'você deletou todas as farmacias'})
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
        const objeto = filteredEntries.reduce( (acc , curr) => {
            return {
                ...acc,
                [curr[0]]: curr[1] 
             }

        },{})

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