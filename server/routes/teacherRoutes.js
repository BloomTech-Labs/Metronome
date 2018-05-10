const routes = require('express').Router();
const teacherController = require('../controllers/teacherController');
const { isAuthenticated, isTeacher } = require('../services/auth');

routes.post('/emailAssignments', isAuthenticated, isTeacher, teacherController.emailAssignments);
routes.get('/assignments', isAuthenticated, isTeacher, teacherController.getAssignments);
module.exports = routes;
