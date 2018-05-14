/**
 * @apiDefine InvalidInputError
 *
 * @apiError InvalidInput Describes the input error (invalid email format, invalid password length, etc.).
 *
 * @apiErrorExample InvalidInput-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": "Password must be between 8 and 56 characters."
 *    }
 */

/**
 * @apiDefine InvalidInputsError
 *
 * @apiError InvalidInput Describes the input error (invalid email format, invalid password length, etc.). "errors" will always be an array, even if there is only one error.
 *
 * @apiErrorExample InvalidInput-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": ["Password must be between 8 and 56 characters.", "First Name is a required field."]
 *    }
 */
