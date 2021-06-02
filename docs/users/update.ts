/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission owner
 * @apiPermission admin
 *
 * @apiParam {number} id The user unique ID.
 * @apiParam {string} email Email of the User.
 * @apiParam {string} username Username of the User.
 *
 * @apiSuccess {UserPrivateData} user	The updated user.
 * @apiUse UserPrivateDataExampleBlock
 *
 * @apiUse RessourceNotFoundBlock
 * @apiUse AuthErrorBlock
 * @apiUse ForbiddenBlock
 * @apiUse ValidationErrorBlock
 */
