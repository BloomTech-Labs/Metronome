const mongoose = require('mongoose');
const Teacher = require('../server/models/Teacher');
const { UserDataFactory } = require('./testDataFactories');

const { validNewUser } = UserDataFactory;

describe('Teacher model', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', async () => {
      await Teacher.registerNewUser(validNewUser);
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('users', done);
  });

  it('Should have teacher role', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    expect(teacher.__t).toEqual('Teacher');
  });
});
