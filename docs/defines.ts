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
 * @apiError E_VALIDATION_FAIL Input validation failed (422).
 *
 * @apiErrorExample {json} 422 (example):
 *     HTTP/1.1 422 Unprocessable Entity
 *		{
			"errors": [
				{
					"rule": "required",
					"field": "bad_field1",
					"message": "required validation failed"
				},
				{
					"rule": "minLength",
					"field": "bad_field2",
					"message": "minLength validation failed"
				}
			]
		}
 */

/**
 * @apiDefine MessageOkBlock
 * @apiSuccessExample {json} 200 (example)
 *		HTTP/1.1 200 OK
		{
			"message": "Ok"
		}
 */
