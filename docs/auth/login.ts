/**
 * @api {post} /login Login
 * @apiName LoginAuth
 * @apiGroup Auth
 * @apiDescription Validate user login credentials, return a token and the user data
 *
 * @apiParam {string} email Email of the User.
 * @apiParam {string} password Password of the User.
 *
 * @apiUse LoginDataBlock
 * @apiError E_BAD_CREDENTIALS Bad login credentials (400).
 */
