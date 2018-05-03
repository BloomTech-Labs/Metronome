const User = require('../models/User');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @api {post} /api/user/register Register a new user
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam {String} email The user's email.
 * @apiParam {String} password The user's password.
 * @apiParam {String} firstName The user's first name.
 * @apiParam {String} lastName The user's last name.
 *
 * @apiSuccess {String} token The new user's JWT.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "abcdef.ghijklmnop.qrstuvwxyz"
 *    }
 *
 * @apiError UserAlreadyExists "User already exists with that email."
 * @apiError InvalidInput Describes the input error (invalid email format, invalid password length, etc.)
 *
 * @apiErrorExample UserAlreadyExists-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "User already exists with that email."
 *    }
 *
 * @apiErrorExample InvalidInput-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Password must be between 8 and 56 characters."
 *    }
 */
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.registerNewUser({
      email,
      password,
      firstName,
      lastName,
    });
    const token = user.generateJWT();
    res.status(200).json({
      token,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

/**
 * @api {post} /api/user/login Log a user in
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} email The user's email.
 * @apiParam {String} password The user's password.
 *
 * @apiSuccess {String} token The user's JWT.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "abcdef.ghijklmnop.qrstuvwxyz"
 *    }
 *
 * @apiError UserDoesNotExist "User does not exist with that email."
 * @apiError IncorrectPassword "Password is not correct."
 *
 * @apiErrorExample UserDoesNotExist-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "User does not exist with that email."
 *    }
 *
 * @apiErrorExample IncorrectPassword-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Password is not correct."
 *    }
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.loginUser({ email, password });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

/**
 * @api {put} /api/user/ Edit the user's profile
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {String} email The user's new email.
 * @apiParam {String} password The user's new password.
 * @apiParam {String} firstName The user's new first name.
 * @apiParam {String} lastName The user's new last name.
 *
 * @apiSuccess {String} token The user's new JWT.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "abcdef.ghijklmnop.qrstuvwxyz"
 *    }
 *
 * @apiError UserAlreadyExists "User already exists with that email."
 * @apiError InvalidInput Describes the input error (invalid email format, invalid password length, etc.)
 *
 * @apiErrorExample UserAlreadyExists-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "User already exists with that email."
 *    }
 *
 * @apiErrorExample InvalidInput-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Password must be between 8 and 56 characters."
 *    }
 */
exports.editProfile = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const currentUser = await User.findById(req.user._id);
    const token = await currentUser.editProfile({
      email,
      password,
      firstName,
      lastName,
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.sendMail = (req, res) => {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  
  try {
    const { to, from, subject, text, html } = req.body;
    const msg = {
      to,
      from,
      subject,
      text,
      html,
    };
    sgMail.send(msg);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
