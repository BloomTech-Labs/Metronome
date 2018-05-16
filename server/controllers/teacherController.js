const Teacher = require('../models/Teacher');
const Assignment = require('../models/Assignment');
const { s3 } = require('../services/s3');
const uuid4 = require('uuid/v4');

/**
 * @api {post} /api/teacher/emailAssignments Email assignments
 * @apiName EmailAssignments
 * @apiGroup Teacher
 *
 * @apiParam {[String]} emails An array of emails to send the assignment to.
 * @apiParam {String} name The name of the assignment.
 * @apiParam {[String]} days The assigned days.
 * @apiParam {Number} hours The number of hours to work on the assignment.
 * @apiParam {Date} dueDate The date that the assignment is due.
 * @apiParam {String} musicSheetAddr The URL to the uploaded music sheet file.
 * @apiParam {String} fileName the name of the file.
 * @apiSuccess {Object} assignment The assignment that was just created.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "assignment": {
 *          "_id": "5af352f0c9b6ae011ddbb065",
 *          "days": {
 *            "Monday": true,
 *            "Wednesday": true,
 *            "Friday": true,
 *          },
 *          "name": "My Assignment",
 *          "dueDate": "2018-05-16 10:59:36.808",
 *          "hours": 5,
 *          "musicSheetAddr": "http://example.com/my_sheet.pdf",
 *          "fileName": "my_sheet.pdf",
 *          "students": [],
 *          "emails": ["test@example.com"],
 *          "createdAt": "2018-05-10T21:08:44.018Z",
 *          "updatedAt": "2018-05-10T21:08:44.018Z",
 *        }
 *    }
 *
 * @apiUse NotAuthorizedError
 */
exports.emailAssignments = async function (req, res, next) {
  try {
    const { emails, name, days, dueDate, hours, musicSheetAddr, fileName } = req.body;
    const teacher = await Teacher.findById(req.user._id);

    const assignmentDetails = { emails, name, days, dueDate, hours, musicSheetAddr, fileName, teacher: teacher._id };
    const assignment = await teacher.emailAssignment(emails, assignmentDetails);
    res.status(200).json({ assignment });
  } catch (err) {
    next(err);
  }
};

/**
 * @api {get} /api/teacher/assignments Get logged in teacher's assignments
 * @apiName GetAssignments
 * @apiGroup Teacher
 *
 * @apiSuccess {Array} assignments An array of the assignments linked to the teacher. (Does not include student progress)
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "assignments": [{
 *        "_id": "5af352f0c9b6ae011ddbb065",
 *        "days": {
 *          "Monday": true,
 *          "Wednesday": true,
 *          "Friday": true,
 *        },
 *        "name": "My Assignment",
 *        "dueDate": "2018-05-16 10:59:36.808",
 *        "hours": 5,
 *        "musicSheetAddr": "http://example.com/my_sheet.pdf",
 *        "students": [{
 *          "email": "test@example.com",
 *          "firstName": "John",
 *          "lastName": "Doe"
 *         }]
 *      }, {
 *        "_id": "5af30e2aff9e28011850d7c4",
 *        "days": {
 *          "Tuesday": true,
 *          "Thursday": true,
 *        },
 *        "name": "My Other Assignment",
 *        "dueDate": "2018-05-16 10:59:36.808",
 *        "hours": 1,
 *        "musicSheetAddr": "http://example.com/my_sheet.png",
 *        "students": [{
 *          "email": "test@example.com",
 *          "firstName": "John",
 *          "lastName": "Doe"
*         }]
 *      }]
 *    }
 * @apiUse NotAuthorizedError
 */
exports.getAssignments = async function (req, res, next) {
  try {
    const assignments = await Assignment
      .find({ teacher: req.user._id })
      .populate('students', '_id email firstName lastName');
    res.status(200).json({ assignments });
  } catch (err) {
    next(err);
  }
};

/**
 * @api {get} /api/teacher/assignment/:id Get an assignment by its id with all students' progress.
 * @apiName GetAssignmentById
 * @apiGroup Teacher
 *
 * @apiSuccess {Object} assignment The assignment.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "assignment": {
 *        "_id": "5af352f0c9b6ae011ddbb065",
 *        "days": {
 *          "Monday": true,
 *          "Wednesday": true,
 *          "Friday": true,
 *        },
 *        "name": "My Assignment",
 *        "dueDate": "2018-05-16 10:59:36.808",
 *        "hours": 5,
 *        "musicSheetAddr": "http://example.com/my_sheet.pdf",
 *        "students": [{
 *          "email": "test@example.com",
 *          "firstName": "John",
 *          "lastName": "Doe"
 *         }]
 *      }
 *    }
 * @apiUse NotAuthorizedError
 */
exports.getAssignmentById = async function (req, res, next) {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment
      .findOne({ _id: assignmentId, teacher: req.user._id })
      .populate('students', '_id email firstName lastName');
    if (!assignment) throw new Error('Assignment not found.');
    // Get each student's progress
    const studentsProgressQuery = assignment.students.map(async (student) => {
      const progress = await assignment.getProgress({ studentId: student._id });
      return { ...student.toObject(), progress };
    });

    const studentsWithProgress = await Promise.all(studentsProgressQuery);

    res.status(200).json({
      assignment: { ...assignment.toObject(), students: studentsWithProgress },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @api {delete} /api/teacher/assignments/:id Deletes an assignment.
 * @apiName DeleteAssignment
 * @apiGroup Teacher
 *
 * @apiSuccess {String} id The id of the deleted assignment.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "5af352f0c9b6ae011ddbb065"
 *    }
 *
 * @apiUse NotAuthorizedError
 */
exports.deleteAssignment = async function (req, res, next) {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndRemove(id);
    const teacher = await Teacher.findById(assignment.teacher);
    teacher.assignments.splice(teacher.assignments.indexOf(id), 1);
    await teacher.save();
    res.status(200).json({ id });
  } catch (err) {
    next(err);
  }
};

/**
 * @api {post} /api/teacher/getUploadUrl Uploads a file to S3 and returns the URL.
 * @apiName GetUploadUrl
 * @apiGroup Teacher
 *
 * @apiSuccess {String} musicSheetAddr the URL to get the downloaded file at.
 * @apiSuccess {String} fileName The original name of the file.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "musicSheetAddr": "https://www.example.com/abc-def-ghijkl",
 *      "fileName": "my_music_sheet.png"
 *    }
 *
 * @apiUse NotAuthorizedError
 */
exports.getUploadUrl = async function (req, res, next) {
  try {
    const key = uuid4();
    s3.upload({
      Bucket: 'labs-metronome',
      ACL: 'public-read',
      Body: req.file.buffer,
      ContentType: 'application/octet-stream',
      Key: key,
      ContentDisposition: `attachment; filename="${req.file.originalname}"`,
    }, (err, data) => {
      if (err) throw err;
      res.status(200).json({
        musicSheetAddr: data.Location,
        fileName: req.file.originalname,
      });
    });
  } catch (err) {
    next(err);
  }
};
