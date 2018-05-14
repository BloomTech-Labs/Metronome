const mongoose = require('mongoose');

const DEFAULT_PROGRESS = {
  Sunday: false,
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
};

const AssignmentProgressSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  progress: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: DEFAULT_PROGRESS,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('AssignmentProgress', AssignmentProgressSchema);
