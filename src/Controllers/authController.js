const connection = require('../database/connection');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {

    async authenticate(req, res) {

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
            .select('name', 'price', 'product_id', 'image', 'quantity');
            
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
            name
        } = req.body

        const result = await connection('drugstores')
        .where({'email' : email ,
                'name' : name })
        .select('email', 'name')
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
              type : 'login',
              user: process.env.EMAIL, 
              pass: process.env.PASSWORD ,
            },
            tls : {
                rejectUnauthorized : false
            }
            });
          
        
        if(result.length == 0) {
            return res.status(500).send({error : 'informações inválidas'})
        }
        else {
            
              const hash = crypto.randomBytes(4).toString("HEX");
              const token = jwt.sign({hash}, process.env.SECRET , { expiresIn : 10 })

               await transporter.sendMail({
                from: '"Equipe do imedicine 👻" <pepo.pedrinho82@gmail.com>', 
                to: `${result[0].email}`, 
                subject: "Recuperação de senha", 
                html: `<p>Olá ${result[0].name}, para recuperar sua senha clique <a href="http://localhost:3000/AlterPassword/${token}">aqui</a>.</p>`, 
              }); 

              return res.status(200).send({success : "uma mensagem de recuperação foi enviada ao seu email"})
        }
    },

      async ChangePassword (req, res) {

        const token = req.params;
        const { email, new_password } = req.body;

        await connection('drugstores')
        .where('email', email)
        .update('password', new_password)

        return res.status(200).send('ta bala')

      }

}