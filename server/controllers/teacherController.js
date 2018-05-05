import { sendEmail } from '../services/email';

// Sample email template - change this when he decide on what exactly to send
const emailTemplate = {
  subject: 'Metronome assignment',
  text: 'You have a new Metronome assignment',
  html: '<h1>Here\'s your assignment</h1>',
};

exports.emailAssignments = async function (req, res) {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  try {
    const { emails = [] } = req.body;
    const emailsToSend = emails.map((email) => {
      const emailToSend = { to: email, ...emailTemplate };
      return sendEmail(emailToSend);
    });
    const results = await Promise.all(emailsToSend);
    console.log(results);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
