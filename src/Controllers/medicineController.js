const connection = require('../database/connection');
const crypto = require('crypto');
const imgurApi = require('../services/imgurApi/api');
const FormData = require('form-data');
const fs = require('fs');

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

        const data = new FormData();
        
        data.append('image', fs.createReadStream(req.file.path));
        
        const response = await imgurApi.post( '/3/upload', data , { headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}` , 
            "Authorization" : "Client-ID f573d680751f416"
        }})
        
        const product_id = crypto.randomBytes(2).toString("HEX")

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
          image: response.data.data.link,
          drugstore_id   
        })
        
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(err)
                return
            }
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
        
        const data2 = new FormData();
        
        data2.append('image', fs.createReadStream(req.file.path));

        
        const response = await imgurApi.post( '/3/upload', data2, { headers: {
            "Content-Type": `multipart/form-data; boundary=${data2._boundary}` , 
            "Authorization" : "Client-ID f573d680751f416"
        }})
    
        const drugstore_id = req.headers.authorization;
        const product_id = req.params.id;
        
        const {
            name,
            price,
        } = req.body;

        const data = {
            name,
            price,
            product_id,
            image: response.data.data.link,
        }

        const dados = Object.entries(data);
        const dadosEmArray= dados.filter( (e) => {
            return e[1] !== null});
            
        const dadosEmJson = dadosEmArray.reduce( (acc, curr) => {
           return {
               ...acc,
            [curr[0]]: curr[1]

        }},{})   
        
            await connection('medicines')
            .where('drugstore_id', drugstore_id)
            .where('product_id', product_id)
            .update(dadosEmJson)

            return res.json({ atualizado : 'voce atualizou'})
    
    }
}