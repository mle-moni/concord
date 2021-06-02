/**
 * @api {get} /users/ List users
 * @apiName IndexUser
 * @apiGroup User
 *
 * @apiSuccess {UserPublicData[]} users Array of users.
 * @apiSuccessExample {json} 200 (example)
 *		HTTP/1.1 200 OK
		[
			{
				"id": 1,
				"username": "test"
			}
		]
 */
