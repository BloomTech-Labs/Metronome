const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 11;
const expDay = 30; // expiration time of JWT
const { secret } = require('../config');

const MIN_EMAIL_LENGTH = 3;
const MAX_EMAIL_LENGTH = 320;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 100;

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 56;


const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [EMAIL_REGEX, 'is invalid'],
    index: true,
    minlength: MIN_EMAIL_LENGTH,
    maxlength: MAX_EMAIL_LENGTH,
  },
  firstName: {
    type: String,
    required: [true, 'can\'t be blank'],
    minlength: MIN_NAME_LENGTH,
    maxlength: MAX_NAME_LENGTH,
  },
  lastName: {
    type: String,
    required: [true, 'can\'t be blank'],
    minlength: MIN_NAME_LENGTH,
    maxlength: MAX_NAME_LENGTH,
  },
  passwordHash: {
    type: String,
  },
}, { timestamps: true });

/**
 * set plain password to password hash
 * @param {String} password
 */
UserSchema.methods.setPassword = function (password) {
  this.passwordHash = bcrypt.hashSync(password, saltRounds);
};

/**
 * validate the password
 * @param {String} password
 */
UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

/**
 * generate JWT for user
 */
UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + expDay);

  return jwt.sign({
    id: this._id,
    email: this.email,
    exp: Math.round(exp.getTime() / 1000),
  }, secret);
};

/**
 * Returns a resolved promise if the new user's information is valid.
 * Rejects the promise with a corresponding error if any input is invalid.
 * @param {Object} opts
 * @param {String} opts.email
 * @param {String} opts.password
 * @param {String} opts.firstName
 * @param {String} opts.lastName
 * @returns {Promise}
 */
UserSchema.statics.validateUser = function ({ email = '', password = '', firstName = '', lastName = '' }) {
  return new Promise(async (resolve, reject) => {
    if (email.length < MIN_EMAIL_LENGTH || email.length > MAX_EMAIL_LENGTH) {
      return reject(new Error(`Email must be between ${MIN_EMAIL_LENGTH} and ${MAX_EMAIL_LENGTH} characters.`));
    }
    if (!email.match(EMAIL_REGEX)) {
      return reject(new Error('Email must be a valid email.'));
    }
    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
      return reject(new Error(`Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`));
    }
    if (firstName.length < MIN_NAME_LENGTH || firstName.length > MAX_NAME_LENGTH) {
      return reject(new Error(`First name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`));
    }
    if (lastName.length < MIN_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
      return reject(new Error(`Last name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`));
    }

    // Check if the user exists before registering them
    try {
      const count = await this.findOne({ email }).count();
      if (count) return reject(new Error('User already exists with that email.'));

      return resolve('User is valid');
    } catch (err) {
      return reject(err);
    }
  });
};

/**
 * Register a new user if the inputs are valid.
 * @param {Object} opts
 * @param {String} opts.email
 * @param {String} opts.password
 * @param {String} opts.firstName
 * @param {String} opts.lastName
 * @returns {Promise} the new user instance
 */
UserSchema.statics.registerNewUser = function (opts) {
  return new Promise(async (resolve, reject) => {
    try {
      await this.validateUser(opts);

      const user = new this({
        email: opts.email,
        firstName: opts.firstName,
        lastName: opts.lastName,
      });
      user.setPassword(opts.password);
      await user.save();
      return resolve(user);
    } catch (err) {
      return reject(err);
    }
  });
};


const User = mongoose.model('User', UserSchema);
module.exports = User;
