const mongoose = require('mongoose');
const Teacher = require('../server/models/Teacher');
const { UserDataFactory } = require('./testDataFactories');

const {
  validNewUser,
  newUserWithBadEmail,
  newUserWithBadPassword,
  newUserWithBadFirstName,
  newUserWithBadLastName,
} = UserDataFactory;

describe('Teacher model', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', done);
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('users', done);
  });

  it('Should not register a teacher with an invalid email', async () => {
    try {
      await Teacher.registerNewUser(newUserWithBadEmail);
    } catch (err) {
      expect(err.message).toBe('Email must be a valid email.');
    }
  });

  it('Should not register a teacher with an invalid password', async () => {
    try {
      await Teacher.registerNewUser(newUserWithBadPassword);
    } catch (err) {
      expect(err.message).toBe('Password must be between 8 and 56 characters.');
    }
  });

  it('Should not register a teacher with an invalid first name', async () => {
    try {
      await Teacher.registerNewUser(newUserWithBadFirstName);
    } catch (err) {
      expect(err.message).toBe('First name must be between 1 and 100 characters.');
    }
  });

  it('Should not register a teacher with an invalid last name', async () => {
    try {
      await Teacher.registerNewUser(newUserWithBadLastName);
    } catch (err) {
      expect(err.message).toBe('Last name must be between 1 and 100 characters.');
    }
  });

  // New student is in the test database after this test
  it('Should register a valid teacher and hash the password correctly', async () => {
    const teacher = await Teacher.registerNewUser(validNewUser);
    const teacherInDb = await Teacher.findOne({ email: teacher.email });
    expect(teacher.email).toEqual(teacherInDb.email);
    expect(teacherInDb.comparePassword(validNewUser.password)).toBeTruthy();
  });

  it('Should validate incorrect passwords properly', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    expect(teacher.comparePassword('wrongpassword')).toBeFalsy();
  });

  it('Should have teacher role', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    expect(teacher.__t).toEqual('Teacher');
  });
  it('Should have students empty array in the teacher', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    expect(teacher.students.length).toEqual(0);
  });
  it('Should have assignments empty array in the teacher', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    expect(teacher.assignments.length).toEqual(0);
  });
});
