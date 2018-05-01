const mongoose = require('mongoose');
const User = require('./User');

const StudentSchema = new mongoose.Schema({
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
});

module.exports = User.discriminator('Student', StudentSchema);
