import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

import { messagesObj } from 'App/Helpers/Messages'

export default class UsersController {
	public async index() {
		const users = await User.all()
		return users.map((user) => user.publicData())
	}

	public async store({ request, response, auth }: HttpContextContract) {
		const validationSchema = schema.create({
			email: schema.string({ trim: true }, [
				rules.email(),
				rules.unique({ table: 'users', column: 'email' }),
			]),
			password: schema.string({ trim: true }, [rules.confirmed()]),
			username: schema.string({ trim: true }, [rules.maxLength(30)]),
		})
		const userDetails = await request.validate({
			schema: validationSchema,
		})

		const user = new User()
		user.email = userDetails.email
		user.password = userDetails.password
		user.username = userDetails.username
		await user.save()
		const token = await auth.use('api').generate(user, {
			expiresIn: '7days',
		})
		response.created({ user: user.privateData(), token })
	}

	public async show({ params }: HttpContextContract) {
		const user = await User.findOrFail(params.id)
		return user.publicData()
	}

	public async update({ request, response, params, auth }: HttpContextContract) {
		const user = await User.findOrFail(params.id)
		if (auth.user!.id !== user.id) {
			return response.forbidden(messagesObj.forbidden)
		}
		const validationSchema = schema.create({
			email: schema.string({ trim: true }, [
				rules.email(),
				rules.unique({ table: 'users', column: 'email' }),
			]),
			username: schema.string({ trim: true }, [rules.maxLength(30)]),
		})
		const userDetails = await request.validate({
			schema: validationSchema,
		})
		user.email = userDetails.email
		user.username = userDetails.username
		await user.save()
		response.ok(user)
	}

	public async destroy({ response, params, auth }: HttpContextContract) {
		const user = await User.findOrFail(params.id)
		if (auth.user!.id !== user.id) {
			return response.forbidden(messagesObj.forbidden)
		}
		await user.delete()
		response.ok(messagesObj.destroyed)
	}
}
