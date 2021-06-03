import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

interface Token {
	type: string
	token: string
}

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('change-password', (group) => {
	group.before(async () => {
		await Database.beginGlobalTransaction()
	})

	group.after(async () => {
		await Database.rollbackGlobalTransaction()
	})
	let user: User | null = null
	const email = 'test@test.fr'
	const password = 'superPassword!!!!'
	let token
	test('POST /profile/change-password bad params', async () => {
		user = await User.create({ email, password, username: 'bob' })
		await supertest(BASE_URL).post('/profile/change-password').expect(401)
		const { body } = await supertest(BASE_URL)
			.post('/login')
			.send({ email, password })
			.expect(200)
		token = <Token>body.token
		await supertest(BASE_URL)
			.post('/profile/change-password')
			.set('Authorization', `Bearer ${token.token}`)
			.expect(422)
		await supertest(BASE_URL)
			.post('/profile/change-password')
			.send({ password: 'rat' })
			.set('Authorization', `Bearer ${token.token}`)
			.expect(422)
		await supertest(BASE_URL)
			.post('/profile/change-password')
			.send({ password: 'rat', password_confirmation: 'ratt' })
			.set('Authorization', `Bearer ${token.token}`)
			.expect(422)
	})
	test('POST /profile/change-password good params', async (assert) => {
		let oldPwd = user?.password
		let res = await supertest(BASE_URL)
			.post('/profile/change-password')
			.send({ password: 'superCool', password_confirmation: 'superCool' })
			.set('Authorization', `Bearer ${token.token}`)
			.expect(200)
		user = await User.find(user?.id)
		assert.exists(res?.body?.message)
		assert.equal(res?.body?.message, 'Ok')
		assert.notEqual(user?.password, oldPwd)
		oldPwd = user?.password
		res = await supertest(BASE_URL)
			.post('/profile/change-password')
			.send({ password: 'jesuisMayeul', password_confirmation: 'jesuisMayeul' })
			.set('Authorization', `Bearer ${token.token}`)
			.expect(200)
		user = await User.find(user?.id)
		assert.exists(res?.body?.message)
		assert.equal(res?.body?.message, 'Ok')
		assert.notEqual(user?.password, oldPwd)
	})
})
