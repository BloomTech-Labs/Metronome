const jwt = require('jsonwebtoken');
const Assignment = require('../models/Assignment');
const Student = require('../models/Student');
const AssignmentProgress = require('../models/AssignmentProgress');

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
 *        "days": {
 *          "Monday": true,
 *          "Wednesday": true,
 *          "Friday" : true
 *        },
 *        "name": "My Assignment",
 *        "dueDate": "2018-05-16 10:59:36.808",
 *        "hours": 5,
 *        "musicSheetAddr": "http://example.com/my_sheet.pdf",
 *        "progress": {
 *          "Monday": true,
 *          "Wednesday": true
 *        }
 *      }, {
 *        "_id": "5af30e2aff9e28011850d7c4",
 *        "days": {
 *          "Tuesday": true,
 *          "Thursday": true,
 *        },
 *        "name": "My Other Assignment",
 *        "dueDate": "2018-05-16 10:59:36.808",
 *        "hours": 1,
 *        "musicSheetAddr": "http://example.com/my_sheet.png",
 *        "progress": {}
 *      }]
 *    }
 * @apiUse NotAuthorizedError
 */
exports.getAssignments = async function (req, res, next) {
  try {
    const student = await Student.findById(req.user._id);
    const assignments = await Assignment
      .find({ students: student._id })
      .select('-students -emails').populate('teacher', 'email firstName lastName');

    // Go through all assignments and add the progress to them
    const progressQuery = assignments.map(async (assignment) => {
      const progress = await assignment.getProgress({ studentId: req.user._id });
      return { ...assignment.toObject(), progress };
    });
    const assignmentsWithProgress = await Promise.all(progressQuery);

    res.status(200).json({ assignments: assignmentsWithProgress });
  } catch (err) {
    next(err);
  }
};

/**
 * @api {get} /api/student/assignment/:id Get an assignment by its Id.
 * @apiName GetAssignmentById
 * @apiGroup Student
 *
 * @apiSuccess {Object} assignment
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "assignment": {
 *        "_id": "5af352f0c9b6ae011ddbb065",
 *        "days": {
 *          "Monday": true,
 *          "Wednesday": true,
 *          "Friday" : true
 *        },
 *        "name": "My Assignment",
 *        "dueDate": "2018-05-16 10:59:36.808",
 *        "hours": 5,
 *        "musicSheetAddr": "http://example.com/my_sheet.pdf",
 *        "progress": {
 *          "Monday": true,
 *          "Wednesday": true
 *        }
 *    }
 * @apiUse NotAuthorizedError
 */
exports.getAssignmentById = async function (req, res, next) {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment
      .findById(assignmentId)
      .select('-students -emails').populate('teacher', 'email firstName lastName');
    const progress = await assignment.getProgress({ studentId: req.user._id });
    res.status(200).json({
      assignment: { ...assignment.toObject(), progress },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @api {post} /api/student/updateProgress Update the progress on an assignment.
 * @apiName UpdateProgress
 * @apiGroup Student
 *
 * @apiParam {Object} progress The student's progress updates.
 * @apiParam {String} assignmentId The assignment to update the progress on.
 * @apiSuccess {Object} progress Returns the progress update that was sent.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "progress": {
 *          "Monday": true,
 *          "Wednesday": true
 *        }
 *    }
 * @apiUse NotAuthorizedError
 */
exports.updateProgress = async function (req, res, next) {
  try {
    const { progress, assignmentId } = req.body;
    const assignmentProgress = await AssignmentProgress.findOne({ assignment: assignmentId, student: req.user._id });
    assignmentProgress.progress = progress;
    assignmentProgress.markModified('progress');
    await assignmentProgress.save();
    res.status(200).json({ progress: assignmentProgress.progress });
  } catch (err) {
    next(err);
  }
};
