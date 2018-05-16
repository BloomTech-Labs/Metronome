const supertest = require('supertest');
const app = require('../server/app');
const Teacher = require('../server/models/Teacher');
const Student = require('../server/models/Student');
const Assignment = require('../server/models/Assignment');
const { connectToTestDb, dropTestCollections } = require('./utils');

const { UserDataFactory, AssignmentDataFactory } = require('./testDataFactories');

const request = supertest(app);

const {
  validNewUser,
  validNewUser2,
} = UserDataFactory;

const { validNewAssignment } = AssignmentDataFactory;

async function setup() {
  await connectToTestDb();
  await Promise.all([
    Teacher.registerNewUser(validNewUser),
    Student.registerNewUser(validNewUser2),
  ]);
}

// Returns a teacher, student, and assignment
async function getUsersAndAssignment() {
  const teacher = await Teacher.findOne({ email: validNewUser.email });
  const student = await Student.findOne({ email: validNewUser2.email });
  const assignment = new Assignment({
    ...validNewAssignment,
    teacher: teacher._id,
    students: [student._id],
  });
  await assignment.save();
  return { teacher, student, assignment };
}

describe('[GET] /api/students/assignments', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

  it('Should retrieve the assignments for the logged in student', async () => {
    const { student } = await getUsersAndAssignment();

    const response = await request
      .get('/api/student/assignments')
      .set('Authorization', student.generateJWT());
    expect(response.status).toBe(200);
    expect(response.body.assignments.length).toBeGreaterThan(0);
  });
});

describe('[GET] /api/student/assignment/:id', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

  it('Should retrieve an assignment by its ID', async () => {
    const { student, assignment } = await getUsersAndAssignment();

    const response = await request
      .get(`/api/student/assignment/${assignment._id.toString()}`)
      .set('Authorization', student.generateJWT());
    expect(response.status).toBe(200);
    expect(response.body.assignment._id).toBe(assignment._id.toString());
  });

  it('Should return a 400 error if no assignment was found', async () => {
    const student = await Student.findOne({ email: validNewUser2.email });
    const response = await request
      .get('/api/student/assignment/sdmngnjreshj')
      .set('Authorization', student.generateJWT());
    expect(response.status).toBe(400);
    expect(response.body.assignment).toBeUndefined();
  });
});

describe('[POST] /api/student/updateProgress', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

  it('Should update progress for an assignment', async () => {
    const { student, assignment } = await getUsersAndAssignment();
    await assignment.getProgress({ studentId: student._id }); // initialize progress
    const response = await request
      .post('/api/student/updateProgress')
      .send({
        assignmentId: assignment._id,
        progress: { Monday: true, Wednesday: true, Friday: true },
      })
      .set('Authorization', student.generateJWT());
    const progress = await assignment.getProgress({ studentId: student._id });
    expect(progress).toEqual({ Monday: true, Wednesday: true, Friday: true });
    expect(response.status).toBe(200);
    expect(response.body.progress).toEqual({ Monday: true, Wednesday: true, Friday: true });
  });
});
