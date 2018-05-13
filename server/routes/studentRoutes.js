const routes = require('express').Router();
const studentController = require('../controllers/studentController');
const { isAuthenticated, isStudent } = require('../services/auth');

routes.post('/claimAssignmentToken', isAuthenticated, studentController.claimAssignmentToken);
routes.get('/assignments', isAuthenticated, isStudent, studentController.getAssignments);
routes.put('/updateAssignment', isAuthenticated, isStudent, studentController.updateAssignment);
module.exports = routes;
