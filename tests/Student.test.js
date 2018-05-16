const mongoose = require('mongoose');
const Student = require('../server/models/Student');
const { UserDataFactory } = require('./testDataFactories');

const { validNewUser } = UserDataFactory;
describe('Student model', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', async () => {
      await Student.registerNewUser(validNewUser);
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('users', done);
  });

  it('Should have student role', async () => {
    const student = await Student.findOne({ email: validNewUser.email });
    expect(student.__t).toEqual('Student');
  });
});
