const routes = require('express').Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../services/auth');

routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.post('/edit', isAuthenticated, userController.editProfile);
routes.post('/sendmail', userController.sendMail);
module.exports = routes;
