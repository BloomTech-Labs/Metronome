const routes = require('express').Router();
const teacherController = require('../controllers/teacherController');
const { isAuthenticated, isTeacher } = require('../services/auth');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 },
});

routes.post('/emailAssignments', isAuthenticated, isTeacher, teacherController.emailAssignments);
routes.get('/assignments', isAuthenticated, isTeacher, teacherController.getAssignments);
routes.get('/assignment/:id', isAuthenticated, isTeacher, teacherController.getAssignmentById);
routes.delete('/assignment/:id', isAuthenticated, isTeacher, teacherController.deleteAssignment);
routes.post('/getUploadUrl', isAuthenticated, isTeacher, upload.single('file'), teacherController.getUploadUrl);

module.exports = routes;
