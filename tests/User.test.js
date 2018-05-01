const mongoose = require('mongoose');
const User = require('../server/models/User');

describe('User model', () => {
  // Test data
  const validUser = {
    email: 'test@example.com',
    password: 'testuserpassword',
    firstName: 'John',
    lastName: 'Doe',
  };
  const userWithBadEmail = { ...validUser, email: 'bademail' };
  const userWithBadPassword = { ...validUser, password: 'abc' };
  const userWithBadFirstName = { ...validUser, firstName: '' };
  const userWithBadLastName = { ...validUser, lastName: '' };

  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', done);
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('users', done);
  });

  it('Should not register a user with an invalid email', async () => {
    try {
      await User.registerNewUser(userWithBadEmail);
    } catch (err) {
      expect(err.message).toBe('Email must be a valid email.');
    }
  });

  it('Should not register a user with an invalid password', async () => {
    try {
      await User.registerNewUser(userWithBadPassword);
    } catch (err) {
      expect(err.message).toBe('Password must be between 8 and 56 characters.');
    }
  });

  it('Should not register a user with an invalid first name', async () => {
    try {
      await User.registerNewUser(userWithBadFirstName);
    } catch (err) {
      expect(err.message).toBe('First name must be between 1 and 100 characters.');
    }
  });

  it('Should not register a user with an invalid last name', async () => {
    try {
      await User.registerNewUser(userWithBadLastName);
    } catch (err) {
      expect(err.message).toBe('Last name must be between 1 and 100 characters.');
    }
  });

  it('Should register a valid user and hash the password correctly', async () => {
    const user = await User.registerNewUser(validUser);
    const userInDb = await User.findOne({ email: user.email });
    expect(user.email).toEqual(userInDb.email);
    expect(userInDb.isValidPassword(validUser.password)).toBeTruthy();
  });

  it('Should validate incorrect passwords properly', async () => {
    const user = await User.findOne({ email: validUser.email });
    expect(user.isValidPassword('wrongpassword')).toBeFalsy();
  });
});
