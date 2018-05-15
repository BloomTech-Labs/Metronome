const routes = require('express').Router();
const studentController = require('../controllers/studentController');
const { isAuthenticated, isStudent } = require('../services/auth');

routes.get('/assignments', isAuthenticated, isStudent, studentController.getAssignments);
routes.get('/assignment/:id', isAuthenticated, isStudent, studentController.getAssignmentById);
routes.post('/claimAssignmentToken', isAuthenticated, studentController.claimAssignmentToken);
routes.post('/updateProgress', isAuthenticated, isStudent, studentController.updateProgress);

module.exports = routes;
