const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server/app');
const User = require('../server/models/User');
const { UserDataFactory } = require('./testDataFactories');

const request = supertest(app);

const {
  validNewUser,
  newUserWithBadEmail,
  newUserWithBadPassword,
} = UserDataFactory;

describe('[POST] /api/user/register ', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', done);
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('users', done);
  });

  it('Should return an error if the user input was invalid', async () => {
    const response = await request.post('/api/user/register').send(newUserWithBadEmail);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.token).toBeUndefined();
  });

  it('Should register the user if the input was valid and return a JSON Web Token', async () => {
    const response = await request.post('/api/user/register').send(validNewUser);
    expect(response.status).toBe(200);
    expect(response.body.token.length).toBeGreaterThan(0);
    expect(response.body.error).toBeUndefined();
  });
});

describe('[POST] /api/user/login', () => {
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

  it('Should return an error if a user does not exist with the given email', async () => {
    const userThatIsntRegistered = {
      email: 'myemailisnotregistered@example.com',
      password: 'testuserpassword',
    };

    const response = await request.post('/api/user/login').send(userThatIsntRegistered);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('User does not exist with that email.');
    expect(response.body.token).toBeUndefined();
  });

  it('Should return an error if the submitted password is invalid', async () => {
    const response = await request.post('/api/user/login').send(newUserWithBadPassword);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Password is not correct.');
    expect(response.body.token).toBeUndefined();
  });

  it('Should return a JSON Web Token if the input was valid', async () => {
    const { email, password } = validNewUser; // User is in the database from beforeAll hook
    const response = await request.post('/api/user/login').send({ email, password });
    expect(response.status).toBe(200);
    expect(response.body.token.length).toBeGreaterThan(0);
    expect(response.body.error).toBeUndefined();
  });
});

