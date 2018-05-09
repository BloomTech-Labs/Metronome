const mongoose = require('mongoose');
const moment = require('moment');

const VALID_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
  dueDate: {
    type: Date,
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
  emails: [String],
}, { timestamps: true });

AssignmentSchema.statics.validateDays = function (days = ['']) {
  const isYYYYMMDD = date => moment(date, 'YYYY-MM-DD', true).isValid();
  const isBeforeToday = date => moment(date).isBefore(moment(), 'day');

  days.forEach((day) => {
    if (!isYYYYMMDD(day)) throw new Error(`Invalid date: ${day}. (Must be YYYY-MM-DD format)`);
    if (isBeforeToday(day)) throw new Error('An assignment date cannot be before today.');
  });
};

AssignmentSchema.statics.validateHours = function (hours = 0) {
  if (Number.isNaN(hours)) throw new Error('Assignment hours must be a number.');
  if (hours <= 0) throw new Error('Assignment hours must be above 0 hours.');
};

module.exports = mongoose.model('Assignment', AssignmentSchema);

