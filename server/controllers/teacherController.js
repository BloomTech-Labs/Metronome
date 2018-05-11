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
 * @apiSuccess {String} message A simple success message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "Emails sent successfully!"
 *    }
 *
 * @apiErrorExample InvalidEmails-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Could not send emails. Please verify that all email addresses are valid."
 *    }
 */
exports.emailAssignments = async function (req, res, next) {
  try {
    const { emails, name, days, dueDate, hours, musicSheetAddr } = req.body;
    const teacher = await Teacher.findById(req.user._id);

    const assignment = new Assignment({ emails, name, days, dueDate, hours, musicSheetAddr, teacher: teacher._id });
    await assignment.save();
    await teacher.emailAssignment(emails, assignment._id);
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (err) {
    next(err);
  }
};

/**
 * @api {get} /api/teacher/assignment Get logged in teacher's assignments
 * @apiName GetAssignments
 * @apiGroup Teacher
 *
 * @apiSuccess {Array} assignments An array of the assignments linked to the teacher.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "assignments": [{
 *        "_id": "5af352f0c9b6ae011ddbb065",
 *        "days": ["Monday", "Wednesday", "Friday"],
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
 *        "days": ["Monday"],
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
 * @apiUse InvalidInputsError
 */
exports.getAssignments = async function (req, res, next) {
  try {
    const teacher = await Teacher.findById(req.user._id);
    const assignments = await Assignment
      .find({ teacher: teacher._id })
      .populate('students', 'email firstName lastName');
    res.status(200).json({ assignments });
  } catch (err) {
    next(err);
  }
};

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
