const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const { secret } = require('../config'); // secret for JWT

const saltRounds = 11;
const expDay = 30; // expiration time of JWT

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  passwordHash: String,
}, { timestamps: true });

/**
 * check the uniqueness of fields
 */
UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

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

module.exports = mongoose.model('User', UserSchema);
