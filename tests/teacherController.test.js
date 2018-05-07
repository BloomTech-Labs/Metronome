const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server/app');
const User = require('../server/models/User');
const Teacher = require('../server/models/Teacher');

const { UserDataFactory } = require('./testDataFactories');

const request = supertest(app);

const {
  validNewUser,
  validNewUser2,
} = UserDataFactory;

describe('[POST] /api/teacher/emailAssignments', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', async () => {
      await Promise.all([
        Teacher.registerNewUser(validNewUser),
        User.registerNewUser(validNewUser2),
      ]);
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('users', done);
  });

  it('Should return an error if the request is not from a teacher', async () => {
    const user = await User.findOne({ email: validNewUser2.email });
    const response = await request
      .post('/api/teacher/emailAssignments')
      .set('Authorization', user.generateJWT())
      .send({ emails: 'test@example.com' });
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Not authorized');
  });

  it('Should return an error if an email is valid', async () => {
    const user = await Teacher.findOne({ email: validNewUser.email });
    const response = await request
      .post('/api/teacher/emailAssignments')
      .set('Authorization', user.generateJWT())
      .send({ emails: 'test@example.com,asdfg' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Could not send emails. Please verify that all email addresses are valid.');
  });

  it('Should successfully send out emails if the emails are valid', async () => {
    const user = await Teacher.findOne({ email: validNewUser.email });
    const response = await request
      .post('/api/teacher/emailAssignments')
      .set('Authorization', user.generateJWT())
      .send({ emails: 'test@example.com, hey@example.com' });
    expect(response.status).toBe(200);
    expect(response.body.error).toBeUndefined();

  });
});
