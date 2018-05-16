const supertest = require('supertest');
const app = require('../server/app');
const User = require('../server/models/User');
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

describe('[POST] /api/teacher/emailAssignments', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

  it('Should return an error if the request is not from a teacher', async () => {
    const user = await User.findOne({ email: validNewUser2.email });
    const response = await request
      .post('/api/teacher/emailAssignments')
      .set('Authorization', user.generateJWT())
      .send({ emails: 'test@example.com' });
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Not authorized');
  });

  it('Should return a 400 error from sendgrid if an email is invalid', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    const response = await request
      .post('/api/teacher/emailAssignments')
      .set('Authorization', teacher.generateJWT())
      .send({ emails: 'test@example.com,asdfg' });
    expect(response.status).toBe(400);
  });

  it('Should successfully send out emails if the emails are valid', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    const response = await request
      .post('/api/teacher/emailAssignments')
      .set('Authorization', teacher.generateJWT())
      .send(validNewAssignment);
    expect(response.status).toBe(200);
    expect(response.body.assignment).toBeDefined();
    expect(response.body.error).toBeUndefined();
  });
});

describe('[GET] /api/teacher/assignments', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

  it('Should retrieve the assignments for the logged in teacher', async () => {
    const { teacher } = await getUsersAndAssignment();

    const response = await request
      .get('/api/teacher/assignments')
      .set('Authorization', teacher.generateJWT());
    expect(response.status).toBe(200);
    expect(response.body.assignments.length).toBeGreaterThan(0);
  });
});

describe('[GET] /api/teacher/assignment/:id', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

  it('Should retrieve an assignment by its ID', async () => {
    const { teacher, assignment } = await getUsersAndAssignment();

    const response = await request
      .get(`/api/teacher/assignment/${assignment._id.toString()}`)
      .set('Authorization', teacher.generateJWT());
    expect(response.status).toBe(200);
    expect(response.body.assignment._id).toBe(assignment._id.toString());
  });

  it('Should return a 400 error if no assignment was found', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    const response = await request
      .get('/api/teacher/assignment/adsfghwedbfhbjkasdbjk')
      .set('Authorization', teacher.generateJWT());
    expect(response.status).toBe(400);
    expect(response.body.assignment).toBeUndefined();
  });
});

describe('[DELETE] /api/teacher/assignment/:id', () => {
  beforeAll(setup);
  afterAll(dropTestCollections);

  it('Should delete an assignment with the given ID', async () => {
    const { teacher, assignment } = await getUsersAndAssignment();

    const response = await request
      .get(`/api/teacher/assignment/${assignment._id.toString()}`)
      .set('Authorization', teacher.generateJWT());
    expect(response.status).toBe(200);
    expect(response.body.assignment._id).toBe(assignment._id.toString());
  });

  it('Should return a 400 error if no assignment was found', async () => {
    const teacher = await Teacher.findOne({ email: validNewUser.email });
    const response = await request
      .get('/api/teacher/assignment/adsfghwedbfhbjkasdbjk')
      .set('Authorization', teacher.generateJWT());
    expect(response.status).toBe(400);
    expect(response.body.assignment).toBeUndefined();
  });
});
