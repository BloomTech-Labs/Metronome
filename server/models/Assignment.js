const mongoose = require('mongoose');
const moment = require('moment');
const validate = require('mongoose-validator');

// const VALID_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AssignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Assignment name is a required field.'],
    validate: [
      validate({
        validator: 'isLength',
        arguments: [1, 100],
        message: 'Assignment name must be between {ARGS[0]} and {ARGS[1]} characters.',
      }),
    ],
  },
  days: {
    type: [String],
    required: [true, 'Assignment days is a required field.'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Assignment due date is a required field.'],
    validate: [
      validate({
        validator: dueDate => !moment(dueDate).isBefore(moment(), 'day'),
        message: 'An assignment due date cannot be before today.',
      }),
    ],
  },
  hours: {
    type: Number,
    required: [true, 'Assignment hours is a required field.'],
    validate: [
      validate({
        validator: hours => hours > 0,
        message: 'Assignment hours must be above 0 hours.',
      }),
    ],
  },
  musicSheetAddr: {
    type: String,
    required: [true, 'Assignment music sheet address is a required field.'],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  emails: {
    type: [String],
    required: [true, 'Assignment emails is a required field.'],
  },
}, { timestamps: true });


module.exports = mongoose.model('Assignment', AssignmentSchema);
