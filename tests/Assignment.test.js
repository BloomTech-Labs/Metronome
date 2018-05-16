const mongoose = require('mongoose');
const Assignment = require('../server/models/Assignment');
const { AssignmentDataFactory } = require('./testDataFactories');

const {
  validNewAssignment,
  newAssignmentWithBadAddress,
  newAssignmentWithBadDays,
  newAssignmentWithBadHours,
  newAssignmentWithBadDueDate,
  newAssignmentWithBadName,
  newAssignmentWithBadEmails,
} = AssignmentDataFactory;

describe('Assignment model', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', done);
  });

  afterAll((done) => {
    mongoose.connection.db.dropCollection('assignments', done);
  });

  it('Should not register a assignment with a missing name', async () => {
    try {
      await Assignment.create(newAssignmentWithBadName);
    } catch (err) {
      expect(err.errors.name.message).toBe('Assignment name is a required field.');
    }
  });

  it('Should not register a assignment with missing days', async () => {
    try {
      await Assignment.create(newAssignmentWithBadDays);
    } catch (err) {
      expect(err.errors.days.message).toBe('Assignment days is a required field.');
    }
  });

  it('Should not register a assignment with missing hours', async () => {
    try {
      await Assignment.create(newAssignmentWithBadHours);
    } catch (err) {
      expect(err.errors.hours.message).toBe('Assignment hours is a required field.');
    }
  });

  it('Should not register a assignment with an invalid due date', async () => {
    try {
      await Assignment.create(newAssignmentWithBadDueDate);
    } catch (err) {
      expect(err.errors.dueDate.message).toBe('Assignment due date is a required field.');
    }
  });

  it('Should not register a assignment with a missing music sheet address', async () => {
    try {
      await Assignment.create(newAssignmentWithBadAddress);
    } catch (err) {
      expect(err.errors.musicSheetAddr.message).toBe('Assignment music sheet address is a required field.');
    }
  });

  it('Should not register a assignment with missing emails', async () => {
    try {
      await Assignment.create(newAssignmentWithBadEmails);
    } catch (err) {
      expect(err.errors.emails.message).toBe('Assignment emails is a required field.');
    }
  });

  // New assignment is in the test database after this test
  it('Should register a valid assignment', async () => {
    const assignment = await Assignment.create(validNewAssignment);
    const assignmentInDb = await Assignment.findOne({ name: assignment.name });
    expect(assignment.hours).toEqual(assignmentInDb.hours);
  });
});
