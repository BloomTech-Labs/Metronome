const validate = require('mongoose-validator');

const dayRegex = /Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/;

// Validates an object's keys to only allow for days of the week
// Days must start with a capital letter
const isDaysOfWeekObject = validate({
  validator(days) {
    return Object.keys(days).every(day => day.match(dayRegex));
  },
  message: 'Invalid days.',
});

module.exports = isDaysOfWeekObject;
