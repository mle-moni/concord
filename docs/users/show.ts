/**
 * @api {get} /users/:id Show user
 * @apiName ShowUser
 * @apiGroup User
 *
 * @apiParam {number} id The user unique ID.
 *
 * @apiSuccess {number} id The unique ID of the user.
 * @apiSuccess {string} username The username of the user.
 * @apiSuccessExample {json} 200 (example)
 *		HTTP/1.1 200 OK
		{
			"id": 1,
			"username": "test"
		}
	@apiUse RessourceNotFoundBlock
 */
