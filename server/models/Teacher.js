const mongoose = require('mongoose');
const User = require('./User');
const Assignment = require('./Assignment');
const jwt = require('jsonwebtoken');
const { secret, url } = require('../config');
const { sendEmail } = require('../services/email');

const Student = User.getModelForRole('Student');

const TeacherSchema = new mongoose.Schema({
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
});

TeacherSchema.methods.emailAssignment = async function (studentEmails = [], assignmentDetails) {
  const assignment = new Assignment(assignmentDetails);
  // See if each student is registered
  // If they are registered, return the entire student object (otherwise just return their email)
  const students = await Promise.all(studentEmails.map(async (email) => {
    const student = await Student.findOne({ email });
    if (student) return student;
    return { email };
  }));

  // Register the student with the assignment if they are already registered
  // Else add them to the emails list
  const registeredStudentIDs = [];
  const unregisteredStudentEmails = [];
  students.forEach((student) => {
    if (student._id) registeredStudentIDs.push(student._id);
    else unregisteredStudentEmails.push(student.email);
  });
  assignment.students = registeredStudentIDs;
  assignment.emails = unregisteredStudentEmails;
  await assignment.save();

  const emailsToSend = students.map(async ({ email, _id }) => {
    const token = jwt.sign({
      email,
      assignmentId: assignment._id,
    }, secret, { expiresIn: '7 days' });

    const notRegisteredMessage = `To get this assignment, go to ${url}/claim-token?token=${token} and make an account.`;
    const registeredMessage = 'You can go to your assignments dashboard to view this assignment.';
    const isRegistered = (_id !== undefined);

    const emailTemplate = {
      to: email,
      from: 'lambda.metronome@gmail.com',
      subject: `Metronome assignment from ${this.firstName} ${this.lastName}`,
      text: 'You have a new Metronome assignment',
      html: `<p>
              ${this.firstName} ${this.lastName} has sent you an assignment. 
              ${isRegistered ? registeredMessage : notRegisteredMessage}
            </p>`,
    };

    return sendEmail(emailTemplate);
  });

  await Promise.all(emailsToSend);
  return assignment;
};

module.exports = User.discriminator('Teacher', TeacherSchema);
