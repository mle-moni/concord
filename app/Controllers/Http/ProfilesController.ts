import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { messagesObj } from 'App/Helpers/Messages'

export default class ProfilesController {
	public async changePassword({ request, auth }: HttpContextContract) {
		const validationSchema = schema.create({
			password: schema.string({ trim: true }, [rules.confirmed()]),
		})
		const newPassword = await request.validate({
			schema: validationSchema,
		})
		const user = auth.user!
		user.password = newPassword.password
		await user.save()
		return messagesObj.ok
	}
}
