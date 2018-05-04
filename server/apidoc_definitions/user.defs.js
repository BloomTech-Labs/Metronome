/**
 * @apiDefine UserAlreadyExistsError
 *
 * @apiError UserAlreadyExists "User already exists with that email."
 *
 * @apiErrorExample UserAlreadyExists-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "User already exists with that email."
 *    }
 */

/**
 * @apiDefine UserDoesNotExistError
 *
 * @apiError UserDoesNotExist "User does not exist with that email."
 *
 * @apiErrorExample UserDoesNotExist-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "User does not exist with that email."
 *    }
 */

/**
 * @apiDefine InvalidInputError
 *
 * @apiError InvalidInput Describes the input error (invalid email format, invalid password length, etc.)
 *
 * @apiErrorExample InvalidInput-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Password must be between 8 and 56 characters."
 *    }
 */

/**
 * @apiDefine IncorrectPasswordError
 *
 * @apiError IncorrectPassword "Password is not correct."
 *
 * @apiErrorExample IncorrectPassword-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Password is not correct."
 *    }
 */
