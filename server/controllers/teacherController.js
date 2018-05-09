const { sendEmail } = require('../services/email');
const Teacher = require('../models/Teacher');
const Assignment = require('../models/Assignment');

// Sample email template - change this when we decide on what exactly to send
const emailTemplate = {
  from: 'lambda.metronome@gmail.com',
  subject: 'Metronome assignment',
  text: 'You have a new Metronome assignment',
  html: '<p>A teacher has sent you an assignment. </p>',
};

/**
 * @api {post} /api/teacher/emailAssignments Email assignments
 * @apiName EmailAssignments
 * @apiGroup Teacher
 *
 * @apiParam {String} emails A comma separated list of student emails (or just one email) to send the assignment to.
 *
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
    console.log(err);
    res.status(400).json({
      error: 'Could not send emails. Please verify that all email addresses are valid.',
    });
  }
};
