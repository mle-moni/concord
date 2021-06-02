// ValidationErrorBlock

/**
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {string} email Email of the User.
 * @apiParam {string} username Username of the User.
 * @apiParam {string} password Password of the User.
 * @apiParam {string} password_confirmation Password confirmation.
 *
 * @apiSuccess {UserPrivateData} user	The user private data.
 * @apiSuccess {token} token			An authentication token.
 * @apiSuccessExample {json} 201 (example)
 *		HTTP/1.1 201 CREATED {
			"user": {
				"id": 3,
				"email": "rat@rat.fr",
				"username": "Rat"
			},
			"token": {
				"type": "bearer",
				"token": "Y2twZms5OXN1MDAwMHJ2cGo1dHVlNG1iZw.CVw7SzreOhAjhW6K15aamsfgRWZb77DCZsDk-lS0NLwjYSLRoTqdn5xIky_U",
				"expires_at": "2021-06-09T14:24:17.882+00:00"
			}
		}
 * @apiUse ValidationErrorBlock
*/
