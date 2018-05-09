const Teacher = require('../models/Teacher');
const Assignment = require('../models/Assignment');
/**
 * @api {post} /api/teacher/emailAssignments Email assignments
 * @apiName EmailAssignments
 * @apiGroup Teacher
 *
 * @apiParam {String} emails A comma separated list of student emails (or just one email) to send the assignment to.
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
exports.emailAssignments = async function (req, res) {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  // TODO: Add in actual assignments field
  try {
    const { emails, name, days, dueDate, hours, musicSheetAddr } = req.body;
    const emailsArray = req.body.emails.split(',').map(email => email.trim());
    const teacher = await Teacher.findById(req.user._id);

    const assignment = new Assignment({ emails, name, days, dueDate, hours, musicSheetAddr, teacher: teacher._id });
    await assignment.save();
    await teacher.emailAssignment(emailsArray, assignment._id);
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
