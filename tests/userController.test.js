const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../server/app');
const User = require('../server/models/User');
const { UserDataFactory } = require('./testDataFactories');
const { connectToTestDb, dropTestCollections } = require('./utils');

const request = supertest(app);

const {
  validNewUser,
  newUserWithBadEmail,
  newUserWithBadPassword,
} = UserDataFactory;

async function setup() {
  await connectToTestDb();
  await User.registerNewUser(validNewUser);
}

describe('[POST] /api/user/register ', () => {
  beforeAll(setup);

  afterEach((done) => {
    User.remove({}, done);
  });

  afterAll(dropTestCollections);

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

  it('Should not register a user with an invalid role', async () => {
    const response = await request.post('/api/user/register').send({ ...validNewUser, role: 'Wizard' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('Should default the user to a Student role if the role is not specified', async () => {
    const response = await request.post('/api/user/register').send(validNewUser);
    expect(response.status).toBe(200);
    expect(response.body.token.length).toBeGreaterThan(0);
    expect(response.body.error).toBeUndefined();
    expect(jwt.decode(response.body.token).role).toBe('Student');
  });
});

describe('[POST] /api/user/login', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

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

describe('[PUT] /api/user', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

  it('Should return an error if the old password is incorrect', async () => {
    const user = await User.findOne({ email: validNewUser.email });
    const newData = {
      oldPassword: 'wrongoldpassword',
      newPassword: 'mynewpassword',
      firstName: 'NewFirstName',
    };
    const response = await request
      .put('/api/user')
      .set('authorization', user.generateJWT())
      .send(newData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Password is not correct.');
  });

  it('Should return an error if a field has invalid data', async () => {
    const user = await User.findOne({ email: validNewUser.email });
    const newData = {
      newEmail: 'bademail',
    };
    const response = await request
      .put('/api/user')
      .set('authorization', user.generateJWT())
      .send(newData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email must be a valid email.');
  });

  it('Should return a new JSON Web Token if all the input was valid', async () => {
    const user = await User.findOne({ email: validNewUser.email });
    const newData = {
      newEmail: 'mynewemail@example.com',
      oldPassword: validNewUser.password,
      newPassword: 'mynewpassword',
      firstName: 'NewFirstName',
      lastName: 'NewLastName',
    };
    const response = await request
      .put('/api/user')
      .set('authorization', user.generateJWT())
      .send(newData);
    expect(response.status).toBe(200);
    expect(response.body.token.length).toBeGreaterThan(0);
    expect(response.body.error).toBeUndefined();
  });
});
