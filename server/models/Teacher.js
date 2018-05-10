const mongoose = require('mongoose');
const User = require('./User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const { sendEmail } = require('../services/email');

const TeacherSchema = new mongoose.Schema({
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
});

TeacherSchema.methods.emailAssignment = async function (studentEmails = [], assignmentId = '') {
  const emailsToSend = studentEmails.map((email) => {
    const token = jwt.sign({
      email,
      assignmentId,
    }, secret, { expiresIn: '7 days' });

    const url = `http://localhost:8000/claim-token?token=${token}`;
    const emailTemplate = {
      to: email,
      from: 'lambda.metronome@gmail.com',
      subject: `Metronome assignment from ${this.firstName} ${this.lastName}`,
      text: 'You have a new Metronome assignment',
      html: `<p>
              ${this.firstName} ${this.lastName} has sent you an assignment. 
              To view this assignment, go to the following url: ${url}
            </p>`,
    };

    return sendEmail(emailTemplate);
  });

  await Promise.all(emailsToSend);
};

module.exports = User.discriminator('Teacher', TeacherSchema);
