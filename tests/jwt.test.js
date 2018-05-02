const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server/app');
const User = require('../server/models/User');
const { UserDataFactory } = require('./testDataFactories');

const request = supertest(app);
const { validNewUser } = UserDataFactory;


describe('JSON Web Token middleware', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', async () => {
      await User.registerNewUser(validNewUser);
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('users', done);
  });

  it('Should not allow an unauthenticated user to access an authenticated route', async () => {
    const response = await request.get('/auth-route');
    expect(response.status).toBe(422);
    expect(response.body.error).toBe('Login token not found. Please log in.');
  });

  it('Should not allow a user with an invalid/expired token to access an authenticated route', async () => {
    const response = await request.get('/auth-route').set('authorization', 'badtoken');
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Login token has expired. Please log in again.');
  });

  it('Should allow an authenticated user to access an authenticated route', async () => {
    const user = await User.findOne({ email: validNewUser.email }); // User is in the database from beforeAll hook
    const response = await request.get('/auth-route').set('authorization', user.generateJWT());
    expect(response.status).toBe(200);
    expect(response.body.response).toBe('Successfully authenticated!');
    expect(response.body.error).toBeUndefined();
  });
});
