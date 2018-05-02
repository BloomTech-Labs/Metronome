const mongoose = require('mongoose');
const Assignment = require('../server/models/Assignment');
const { AssignmentDataFactory } = require('./testDataFactories');

const {
  validNewAssignment,
  newAssignmentWithBadAddress,
  newAssignmentWithBadDays,
  newAssignmentWithBadHours,
  newAssignmentWithBadName,
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

  it('Should not register a assignment with an invalid name', async () => {
    try {
      await Assignment.create(newAssignmentWithBadName);
    } catch (err) {
      expect(err.message).toBe('Assignment validation failed: name: can\'t be blank');
    }
  });

  it('Should not register a assignment with an invalid days', async () => {
    try {
      await Assignment.create(newAssignmentWithBadDays);
    } catch (err) {
      expect(err.message).toBe('Assignment validation failed: days: can\'t be blank');
    }
  });

  it('Should not register a assignment with an invalid hours', async () => {
    try {
      await Assignment.create(newAssignmentWithBadHours);
    } catch (err) {
      expect(err.message).toBe('Assignment validation failed: hours: can\'t be blank');
    }
  });

  it('Should not register a assignment with an invalid music sheet address', async () => {
    try {
      await Assignment.create(newAssignmentWithBadAddress);
    } catch (err) {
      expect(err.message).toBe('Assignment validation failed: musicSheetAddr: can\'t be blank');
    }
  });

  // New assignment is in the test database after this test
  it('Should register a valid assignment', async () => {
    const assignment = await Assignment.create(validNewAssignment);
    const assignmentInDb = await Assignment.findOne({ name: assignment.name });
    expect(assignment.hours).toEqual(assignmentInDb.hours);
  });

  it('Should have students empty array in the assignment', async () => {
    const assignment = await Assignment.findOne({ name: validNewAssignment.name });
    expect(assignment.students.length).toEqual(0);
  });

  it('Should have a teacher field in the assignment', async () => {
    const assignment = await Assignment.findOne({ name: validNewAssignment.name });
    expect(assignment.teacher).toEqual(undefined);
  });
});
