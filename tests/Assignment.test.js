const mongoose = require('mongoose');
const Assignment = require('../server/models/Assignment');

describe('Assignment model', () => {
  // Test data
  const validAssignment = {
    name: 'everyday practice',
    days: ['monday', 'wednesday', 'friday'],
    hours: 1,
    musicSheetAddr: 'localhost:8000',
  };
  const badName = { ...validAssignment, name: null };
  const badDays = { ...validAssignment, days: null };
  const badHours = { ...validAssignment, hours: null };
  const badAddr = { ...validAssignment, musicSheetAddr: null };

  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', done);
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('assignments', done);
  });

  it('Should not register a assignment with an invalid name', async () => {
    try {
      await Assignment.create(badName);
    } catch (err) {
      expect(err.message).toBe('Assignment validation failed: name: can\'t be blank');
    }
  });

  it('Should not register a assignment with an invalid days', async () => {
    try {
      await Assignment.create(badDays);
    } catch (err) {
      expect(err.message).toBe('Assignment validation failed: days: can\'t be blank');
    }
  });

  it('Should not register a assignment with an invalid hours', async () => {
    try {
      await Assignment.create(badHours);
    } catch (err) {
      expect(err.message).toBe('Assignment validation failed: hours: can\'t be blank');
    }
  });

  it('Should not register a assignment with an invalid music sheet address', async () => {
    try {
      await Assignment.create(badAddr);
    } catch (err) {
      expect(err.message).toBe('Assignment validation failed: musicSheetAddr: can\'t be blank');
    }
  });

  it('Should register a valid assignment', async () => {
    const assignment = await Assignment.create(validAssignment);
    const assignmentInDb = await Assignment.findOne({ name: assignment.name });
    expect(assignment.hours).toEqual(assignmentInDb.hours);
  });

  it('Should have students empty array in the assignment', async () => {
    const assignment = await Assignment.findOne({ name: validAssignment.name });
    expect(assignment.students.length).toEqual(0);
  });

  it('Should have a teacher field in the assignment', async () => {
    const assignment = await Assignment.findOne({ name: validAssignment.name });
    expect(assignment.teacher).toEqual(undefined);
  });
});
