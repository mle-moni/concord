/**
 * @api {delete} /users/:id Delete user
 * @apiName DestroyUser
 * @apiGroup User
 * @apiPermission owner
 * @apiPermission admin
 *
 * @apiParam {number} id The user unique ID.
 *
 * @apiSuccess {string} message Informations about the transaction.
 * @apiSuccessExample {json} 200 (example)
 *		HTTP/1.1 200 OK
		{
			"message": "ressource destroyed"
		}
 * @apiUse RessourceNotFoundBlock
 * @apiUse AuthErrorBlock
 * @apiUse ForbiddenBlock
 */
