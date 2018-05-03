const mongoose = require('mongoose');
const Student = require('../server/models/Student');
const { UserDataFactory } = require('./testDataFactories');

const {
  validNewUser,
  newUserWithBadEmail,
  newUserWithBadPassword,
  newUserWithBadFirstName,
  newUserWithBadLastName,
} = UserDataFactory;
describe('Student model', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', done);
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('users', done);
  });

  it('Should not register a student with an invalid email', async () => {
    try {
      await Student.registerNewUser(newUserWithBadEmail);
    } catch (err) {
      expect(err.message).toBe('Email must be a valid email.');
    }
  });

  it('Should not register a student with an invalid password', async () => {
    try {
      await Student.registerNewUser(newUserWithBadPassword);
    } catch (err) {
      expect(err.message).toBe('Password must be between 8 and 56 characters.');
    }
  });

  it('Should not register a student with an invalid first name', async () => {
    try {
      await Student.registerNewUser(newUserWithBadFirstName);
    } catch (err) {
      expect(err.message).toBe('First name must be between 1 and 100 characters.');
    }
  });

  it('Should not register a student with an invalid last name', async () => {
    try {
      await Student.registerNewUser(newUserWithBadLastName);
    } catch (err) {
      expect(err.message).toBe('Last name must be between 1 and 100 characters.');
    }
  });

  // New student is in the test database after this test
  it('Should register a valid student and hash the password correctly', async () => {
    const student = await Student.registerNewUser(validNewUser);
    const studentInDb = await Student.findOne({ email: student.email });
    expect(student.email).toEqual(studentInDb.email);
    expect(studentInDb.comparePassword(validNewUser.password)).toBeTruthy();
  });

  it('Should validate incorrect passwords properly', async () => {
    const student = await Student.findOne({ email: validNewUser.email });
    expect(student.comparePassword('wrongpassword')).toBeFalsy();
  });

  it('Should have student role', async () => {
    const student = await Student.findOne({ email: validNewUser.email });
    expect(student.__t).toEqual('Student');
  });
  it('Should have students empty array in the teacher', async () => {
    const student = await Student.findOne({ email: validNewUser.email });
    expect(student.teachers.length).toEqual(0);
  });
  it('Should have assignments empty array in the teacher', async () => {
    const student = await Student.findOne({ email: validNewUser.email });
    expect(student.assignments.length).toEqual(0);
  });
});
