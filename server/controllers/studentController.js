const jwt = require('jsonwebtoken');
const Assignment = require('../models/Assignment');
const Student = require('../models/Student');

/**
 * @api {post} /api/student/claimAssignmentToken Claim assignment token
 * @apiName ClaimAssignmentToken
 * @apiGroup Student
 *
 * @apiParam {String} assignmentToken a token containing the user's email and the assignment ID.
 * @apiSuccess {String} message A simple success message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Assignment claimed successfully!"
 *    }
 * @apiUse InvalidInputsError
 */
exports.claimAssignmentToken = async function (req, res, next) {
  try {
    const { assignmentToken } = req.body;
    const student = await Student.findById(req.user._id);
    const { assignmentId, email: studentEmail } = jwt.decode(assignmentToken);
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment.emails.includes(studentEmail)) {
      throw new Error('You have already claimed this assignment or you are not registered to the assignment.');
    }

    if (!assignment.students.includes(student._id)) {
      assignment.students.push(student._id);
    }
    assignment.emails = assignment.emails.filter(email => email !== student.email);
    await assignment.save();
    res.status(200).json({ message: 'Assignment claimed successfully!' });
  } catch (err) {
    next(err);
  }
};

/**
 * @api {get} /api/student/assignments Get logged in student's assignments
 * @apiName GetAssignments
 * @apiGroup Student
 *
 * @apiSuccess {Array} assignments An array of the assignments linked to the student.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "assignments": [{
 *        "_id": "5af352f0c9b6ae011ddbb065",
 *        "days": ["Monday", "Wednesday", "Friday"],
 *        "name": "My Assignment",
 *        "dueDate": "2018-05-16 10:59:36.808",
 *        "hours": 5,
 *        "musicSheetAddr": "http://example.com/my_sheet.pdf",
 *      }, {
 *        "_id": "5af30e2aff9e28011850d7c4",
 *        "days": ["Monday"],
 *        "name": "My Other Assignment",
 *        "dueDate": "2018-05-16 10:59:36.808",
 *        "hours": 1,
 *        "musicSheetAddr": "http://example.com/my_sheet.png"
 *      }]
 *    }
 * @apiUse InvalidInputsError
 */
exports.getAssignments = async function (req, res, next) {
  try {
    const student = await Student.findById(req.user._id);
    const assignments = await Assignment
      .find({ students: student._id })
      .select('-students -emails').populate('teacher', 'email firstName lastName');
    res.status(200).json({ assignments });
  } catch (err) {
    next(err);
  }
};

exports.updateAssignment = async (req, res, next) => {
  try {
    const { updates, assignmentId } = req.body;
    const assignment = await Assignment.findById(assignmentId);
    Object.keys(assignment.days).forEach((day) => {
      if (updates[day]) {
        assignment.days[day] = true;
      }
    });
    assignment.markModified('days');
    await assignment.save();
    res.status(200).json({ assignment });
  } catch (err) {
    next(err);
  }
};
