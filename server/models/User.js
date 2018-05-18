const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('mongoose-validator');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const saltRounds = 11;
const expDay = 30; // expiration time of JWT
const { secret } = require('../config');

const MIN_EMAIL_LENGTH = 3;
const MAX_EMAIL_LENGTH = 320;

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 100;

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 56;

const ROLES = ['Teacher', 'Student'];

const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    unique: 'User already exists with that email.',
    required: [true, 'Email is a required field.'],
    index: true,
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Email must be a valid email.',
      }),
      validate({
        validator: 'isLength',
        arguments: [MIN_EMAIL_LENGTH, MAX_EMAIL_LENGTH],
        message: 'Email must be between {ARGS[0]} and {ARGS[1]} characters.',
      }),
    ],
  },
  firstName: {
    type: String,
    required: [true, 'First name is a required field.'],
    validate: [
      validate({
        validator: 'isLength',
        arguments: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
        message: 'First name must be between {ARGS[0]} and {ARGS[1]} characters.',
      }),
    ],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is a required field.'],
    validate: [
      validate({
        validator: 'isLength',
        arguments: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
        message: 'Last name must be between {ARGS[0]} and {ARGS[1]} characters.',
      }),
    ],
  },
  passwordHash: {
    type: String,
  },
  isSubscribe: {
    type: Boolean,
    required: true,
    default: false,
  },
  subscribeType: {
    type: String,
  },
  price: {
    type: String,
  },
  orderId: {
    type: String,
  },
}, { timestamps: true });

UserSchema.plugin(beautifyUnique);

/**
 * set plain password to password hash
 * @param {String} password
 */
UserSchema.methods.setPassword = async function (password) {
  this.passwordHash = await bcrypt.hash(password, saltRounds);
};

/**
 * compare plaintext password to hashed password
 * @param {String} password
 * @returns {Boolean}
 */
UserSchema.methods.comparePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.passwordHash);
  return isValid;
};

/**
 * generate JWT for user
 */
UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + expDay);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: `${this.firstName} ${this.lastName}`,
    role: this.__t,
    isSubscribe: this.isSubscribe,
    exp: Math.round(exp.getTime() / 1000),
  }, secret);
};

/**
 * Register a new user if the input is valid.
 * @param {Object} opts
 * @param {String} opts.email
 * @param {String} opts.password
 * @param {String} opts.firstName
 * @param {String} opts.lastName
 * @param {String} opts.role (defaults to "Student" if not specified)
 * @returns {Promise<any>} the new user instance
 */
UserSchema.statics.registerNewUser = async function ({ email = '', password = '', firstName = '', lastName = '', role = 'Student' }) {
  this.validateRole(role);
  this.validatePasswordLength(password);

  const user = new this({
    email,
    firstName,
    lastName,
  });
  await user.setPassword(password);
  await user.save();
  return user;
};

/**
 * Updates the existing user's profile if the input is valid and returns a new JWT.
 * @param {Object} opts
 * @param {String} opts.email
 * @param {String} opts.oldPassword
 * @param {String} opts.newPassword
 * @param {String} opts.firstName
 * @param {String} opts.lastName
 */
UserSchema.methods.editProfile = async function ({ newEmail, oldPassword, newPassword, firstName, lastName }) {
  if (newPassword && !oldPassword) {
    throw new Error('You must enter your old password to set a new password.');
  }
  if (newPassword && oldPassword) {
    this.model('User').validatePasswordLength(oldPassword);
    this.model('User').validatePasswordLength(newPassword);
    if (!(await this.comparePassword(oldPassword))) {
      throw new Error('Password is not correct.');
    }
    await this.setPassword(newPassword);
  }

  if (firstName) this.firstName = firstName;

  if (lastName) this.lastName = lastName;

  if (newEmail && newEmail !== this.email) this.email = newEmail;
  await this.save();
  return this.generateJWT();
};

/**
 * Returns a JWT if the input is valid.
 * @param {Object} opts
 * @param {String} opts.email
 * @param {String} opts.password
 * @returns {Promise<String>}
 */
UserSchema.statics.loginUser = async function ({ email = '', password = '' }) {
  const token = await this.validateLogin({ email, password });
  return token;
};

/**
 * Returns a promise that resolves to the user's JWT if the email and password is correct.
 * Rejects the promise with a corresponding error if the email or password is invalid.
 * @param {Object} opts
 * @param {String} opts.email
 * @param {String} opts.password
 * @returns {Promise<String>}
 */
UserSchema.statics.validateLogin = async function ({ email = '', password = '' }) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('User does not exist with that email.');

  if (!(await user.comparePassword(password))) {
    throw new Error('Password is not correct.');
  }

  return user.generateJWT();
};

UserSchema.statics.validatePasswordLength = function (password = '') {
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    throw new Error(`Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`);
  }
};

UserSchema.statics.validateRole = function (role = '') {
  if (!ROLES.includes(role)) {
    throw new Error(`Role must be one of the following: ${ROLES.join(', ')}`);
  }
};

UserSchema.statics.getModelForRole = function (role = '') {
  this.validateRole(role);
  // Dynamically import models (the user model has not been exported yet so the discriminators are not actually defined yet)
  if (role === 'Student') return require('./Student');
  else if (role === 'Teacher') return require('./Teacher');
  return this;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
