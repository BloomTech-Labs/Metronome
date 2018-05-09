const jwt = require('jsonwebtoken');
const Assignment = require('../models/Assignment');
const Student = require('../models/Student');

exports.claimAssignmentToken = async function (req, res) {
  const { assignmentToken } = req.body;
  const student = await Student.findById(req.user._id);
  const { assignmentId } = jwt.decode(assignmentToken);
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment.students.includes(student._id)) {
    assignment.students.push(student._id);
  }
  await assignment.save();
  res.status(200).json({ message: 'Success' });
};

exports.getAssignments = async function (req, res) {
  const student = await Student.findById(req.user._id);
  const assignments = await Assignment
    .find({ students: student._id })
    .select('-students -emails');
  res.status(200).json(assignments);
};
