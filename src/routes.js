const express = require('express');
const routes = express.Router();
const authController = require('./Controllers/authController');
const drugstoreController = require('./Controllers/drugstoreController');
const medicineController = require('./Controllers/medicineController');

routes.post('/auth', authController.authorizate);

//rotas das farmácias
routes.delete('/drugstores/:id', drugstoreController.delete);

routes.get('/drugstores/:id', drugstoreController.getById);

routes.get('/drugstores', drugstoreController.getAll);

routes.post('/drugstores', drugstoreController.create);

routes.put('/drugstores/:id', drugstoreController.change);

//rotas dos medicamentos
routes.get('/medicines', medicineController.getAll);

routes.get('/profile', authController.getProfile);

routes.get('/medicines/:id', medicineController.getById);

routes.post('/medicines', medicineController.create);

routes.delete('/medicines/:id', medicineController.delete);

routes.put('/medicines', medicineController.change);

module.exports = routes;