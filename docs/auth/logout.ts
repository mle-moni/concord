/**
 * @api {post} /logout Logout
 * @apiName LogoutAuth
 * @apiGroup Auth
 * @apiPermission auth
 * @apiDescription Revoke API token
 *
 * @apiSuccess {string} message Informations about the transaction.
 * @apiSuccessExample {json} 200 (example)
 *		HTTP/1.1 200 OK
		{
			"message": "Ok"
		}
 * @apiuse AuthErrorBlock
 */
