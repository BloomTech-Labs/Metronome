const mongoose = require('mongoose');

const AssignmentProgressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'can\'t be blank'],
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: [true, 'can\'t be blank'],
  },
  days: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'can\'t be blank'],
  },
});

module.exports = mongoose.model('AssignmentProgress', AssignmentProgressSchema);
