const routes = require('express').Router();
const authController = require('../controllers/authController');

routes.post('/register', authController.register);
routes.post('/login', authController.login);
module.exports = routes;
