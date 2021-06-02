/**
 * @apiDefine admin Admin access rights needed.
 * Access restricted to the admin users.
 */

/**
 * @apiDefine auth Auth needed.
 * Users need to be connected to access the ressource.
 */

/**
 * @apiDefine owner Ownership needed.
 * Users need to be the owner of the ressource to access it.
 */

/**
 *  @apiDefine RessourceNotFoundBlock
	@apiError E_ROW_NOT_FOUND The ressource was not found (404).
 */

/**
 *  @apiDefine AuthErrorBlock
	@apiError E_UNAUTHORIZED_ACCESS The user should be connected (401).
 */

/**
 *  @apiDefine ForbiddenBlock
	@apiError E_FORBIDDEN The user has not rights to access ressource (403).
 */

/**
 * @apiDefine LoginDataBlock
 * @apiSuccess {UserPrivateData} user	The user private data.
 * @apiSuccess {token} token			An authentication token.
 * @apiSuccessExample {json} 200 (example)
 *		HTTP/1.1 200 OK {
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
 */

/**
 * @apiDefine UserPrivateDataExampleBlock
 * @apiSuccessExample {json} 200 (example)
 *		HTTP/1.1 200 OK {
			"user": {
				"id": 3,
				"email": "rat@rat.fr",
				"username": "Rat"
			}
		}
 */

/**
 * @apiDefine ValidationErrorBlock
 *
 * @apiError ValidationError Input validation failed (422).
 *
 * @apiErrorExample {json} 422 (example):
 *     HTTP/1.1 422 Unprocessable Entity
 *		{
			"errors": [
				{
					"rule": "required",
					"field": "email",
					"message": "required validation failed"
				},
				{
					"rule": "required",
					"field": "password",
					"message": "required validation failed"
				},
				{
					"rule": "required",
					"field": "username",
					"message": "required validation failed"
				}
			]
		}
 */
