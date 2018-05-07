const { sendEmail } = require('../services/email');

// Sample email template - change this when we decide on what exactly to send
const emailTemplate = {
  from: 'lambda.metronome@gmail.com',
  subject: 'Metronome assignment',
  text: 'You have a new Metronome assignment',
  html: '<h1>Here\'s your assignment</h1>',
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
    if (!req.body.emails || typeof req.body.emails !== 'string') throw new Error();
    const emails = req.body.emails.split(',').map(email => email.trim());

    const emailsToSend = emails.map((email) => {
      const template = { to: email, ...emailTemplate };
      return sendEmail(template);
    });

    await Promise.all(emailsToSend);
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (err) {
    res.status(400).json({
      error: 'Could not send emails. Please verify that all email addresses are valid.',
    });
  }
};
