const mongoose = require('mongoose');
const User = require('./User');

const TeacherSchema = new mongoose.Schema({
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
});

module.exports = User.discriminator('Teacher', TeacherSchema);
