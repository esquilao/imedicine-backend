const express = require('express');
const routes = express.Router();
const {celebrate, Segments, Joi} = require('celebrate');
const authController = require('./Controllers/authController');
const drugstoreController = require('./Controllers/drugstoreController');
const medicineController = require('./Controllers/medicineController');
const multer = require('multer');
const storage = require('./services/multer/multer');
const medicineUpload = multer(storage('medicines'));
const drugstoreUpload = multer(storage('drugstores'));


routes.post('/auth', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email : Joi.string().email().required(),
        password : Joi.string().token().required()
    })
}) ,authController.authenticate);

//rotas das farmácias

routes.delete('/drugstores/:id', drugstoreController.delete);

routes.delete('/drugstores', drugstoreController.deleteAll);

routes.get('/drugstores/:name', drugstoreController.getByName);

routes.get('/drugstores', drugstoreController.getAll);

routes.post('/Solicit', authController.HandleRequest);

routes.post('/AlterPassword/:token', authController.ChangePassword);

routes.post('/drugstores', drugstoreUpload.single('image'), celebrate({
    [Segments.BODY]: Joi.object().keys({
        email : Joi.string().email().required(),
        password : Joi.string().token().required(),
        name : Joi.string().required(),
        whatsapp : Joi.string().max(11).required(),
        city : Joi.string().required(),
        state : Joi.string().uppercase().length(2),
        address : Joi.string().max(30),
    })
}), drugstoreController.create);

routes.put('/drugstores/:id',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        email : Joi.string().email().required(),
        password : Joi.string().token().required(),
        name : Joi.string().required(),
        whatsapp : Joi.number().required(),
        city : Joi.string().required(),
        state : Joi.string().uppercase().length(2),
        address : Joi.string().max(30),
    })
})  , drugstoreController.change);

//rotas dos medicamentos
routes.get('/medicines',medicineController.getAll);

routes.get('/profile',authController.getProfile);

routes.get('/image', authController.getDrugstoreImage);

routes.get('/medicines/:id', medicineController.getById);

routes.post('/medicines', medicineUpload.single('image') , celebrate({
    [Segments.BODY]: Joi.object().keys({
        name : Joi.string().required(),
        price : Joi.number().precision(2).required(),
        quantity : Joi.number().required()
    })
}) , medicineController.create);

routes.delete('/medicines/:id', medicineController.delete);

routes.put('/medicines/:id', drugstoreUpload.single('image'), celebrate({
    [Segments.BODY]: Joi.object().keys({
        name : Joi.string().required(),
        price : Joi.number().precision(2).required(),
        quantity : Joi.number().required()
    })
})  , medicineController.change);

module.exports = routes;