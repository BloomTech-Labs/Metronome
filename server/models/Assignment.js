const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'can\'t be blank'],
    unique: true,
    index: true,
  },
  days: {
    type: [String],
    required: [true, 'can\'t be blank'],
  },
  hours: {
    type: Number,
    required: [true, 'can\'t be blank'],
  },
  musicSheetAddr: {
    type: String,
    required: [true, 'can\'t be blank'],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);

