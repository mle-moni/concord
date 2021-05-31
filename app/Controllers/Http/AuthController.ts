import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { messagesObj } from 'App/Helpers/Messages'

export default class AuthController {
	public async login({ request, auth }: HttpContextContract) {
		const email = request.input('email') || ''
		const password = request.input('password') || ''
		const token = await auth.use('api').attempt(email, password)
		return { user: auth.user!.privateData(), token }
	}

	public async logout({ auth }: HttpContextContract) {
		await auth.use('api').revoke()
		return messagesObj.ok
	}

	public async me({ auth }: HttpContextContract) {
		return auth.user?.privateData()
	}
}
