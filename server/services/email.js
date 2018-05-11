const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sendgrid service
 * @param {Object} opts
 * @param {String} opts.to The destination email
 * @param {String} opts.subject
 * @param {String} opts.text
 * @param {String} opts.html
 * @returns {Promise} the sendgrid response after sending the email
 */
exports.sendEmail = function ({ to, subject, text, html }) {
  const msg = {
    from: 'lambda.metronome@gmail.com',
    to,
    subject,
    text,
    html,
  };

  return sgMail.send(msg);
};
