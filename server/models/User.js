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
 * compare plaintext password to hashed password
 * @param {String} password
 * @returns {Boolean}
 */
UserSchema.methods.comparePassword = function (password) {
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
    name: `${this.firstName} ${this.lastName}`,
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
 * @returns {Promise<any>} the new user instance
 */
UserSchema.statics.registerNewUser = async function ({ email = '', password = '', firstName = '', lastName = '' }) {
  this.validateEmail(email);
  this.validatePassword(password);
  this.validateFirstName(firstName);
  this.validateLastName(lastName);
  await this.validateUniqueEmail(email);

  const user = new this({
    email,
    firstName,
    lastName,
  });
  user.setPassword(password);
  await user.save();
  return user;
};

/**
 * Updates the existing user's profile if the input is valid and returns a new JWT.
 * @param {Object} opts
 * @param {String} opts.email
 * @param {String} opts.password
 * @param {String} opts.firstName
 * @param {String} opts.lastName
 */
UserSchema.methods.editProfile = async function ({ email, password, firstName, lastName }) {
  if (firstName) {
    this.model('User').validateFirstName(firstName);
    this.firstName = firstName;
  }

  if (lastName) {
    this.model('User').validateLastName(lastName);
    this.lastName = lastName;
  }

  if (password) {
    this.model('User').validatePassword(password);
    this.setPassword(password);
  }

  if (email) {
    this.model('User').validateEmail(email);
    await this.model('User').validateUniqueEmail(email);
    this.email = email;
  }

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
UserSchema.statics.loginUser = function ({ email = '', password = '' }) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await this.validateLogin({ email, password });
      return resolve(token);
    } catch (err) {
      return reject(err);
    }
  });
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

  if (!user.comparePassword(password)) {
    throw new Error('Password is not correct.');
  }

  return user.generateJWT();
};

/**
 * @param {String} email
 */
UserSchema.statics.validateEmail = function (email = '') {
  if (email.length < MIN_EMAIL_LENGTH || email.length > MAX_EMAIL_LENGTH) {
    throw new Error(`Email must be between ${MIN_EMAIL_LENGTH} and ${MAX_EMAIL_LENGTH} characters.`);
  }
  if (!email.match(EMAIL_REGEX)) {
    throw new Error('Email must be a valid email.');
  }
};

/**
 * @param {String} email
 */
UserSchema.statics.validateUniqueEmail = async function (email = '') {
  const count = await this.findOne({ email }).count();
  if (count) throw new Error('User already exists with that email.');
};

/**
 * @param {String} password
 */
UserSchema.statics.validatePassword = function (password = '') {
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    throw new Error(`Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`);
  }
};

/**
 * @param {String} firstName
 */
UserSchema.statics.validateFirstName = function (firstName = '') {
  if (firstName.length < MIN_NAME_LENGTH || firstName.length > MAX_NAME_LENGTH) {
    throw new Error(`First name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`);
  }
};

/**
 *
 * @param {String} lastName
 */
UserSchema.statics.validateLastName = function (lastName = '') {
  if (lastName.length < MIN_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
    throw new Error(`Last name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`);
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
