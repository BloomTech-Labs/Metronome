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
 * @apiError InvalidInput Describes the input error (invalid email format, invalid password length, etc.).
 *
 * @apiErrorExample InvalidInput-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": "Password must be between 8 and 56 characters.", "First Name is a required field."
 *    }
 */

/**
 * @apiDefine InvalidInputErrors
 *
 * @apiError InvalidInput Describes the input error (invalid email format, invalid password length, etc.). "errors" will always be an array, even if there is only one error.
 *
 * @apiErrorExample InvalidInput-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": ["Password must be between 8 and 56 characters.", "First Name is a required field."]
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

/**
 * @apiDefine NotAuthorizedError
 *
 * @apiError NotAuthorized "Not authorized."
 *
 * @apiErrorExample IncorrectPassword-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "error": "Not authorized"
 *    }
 */
