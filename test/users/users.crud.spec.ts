import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Users simple tests', (group) => {
	group.beforeEach(async () => {
		await Database.beginGlobalTransaction()
	})

	group.afterEach(async () => {
		await Database.rollbackGlobalTransaction()
	})

	test('GET /users', async (assert) => {
		const { body } = await supertest(BASE_URL).get('/users').expect(200)
		assert.equal(body?.users?.length, 0)
	})

	test('GET /users (len = 2)', async (assert) => {
		await User.create({ email: 'bob@bob.fr', password: 'test', username: 'bob' })
		await User.create({ email: 'rat@rat.fr', password: 'test', username: 'Rat' })
		const { body } = await supertest(BASE_URL).get('/users').expect(200)
		assert.equal(body.users.length, 2)
		for (let usr of body.users) {
			assert.notExists(usr.email)
			assert.exists(usr.id)
			assert.exists(usr.username)
		}
	})

	test('GET /users/1 (404)', async (assert) => {
		try {
			await supertest(BASE_URL).get('/users/1').expect(404)
		} catch (error) {
			assert.fail(error)
		}
	})

	test('PUT/DELETE /users/1 (401)', async (assert) => {
		try {
			await supertest(BASE_URL).put('/users/1').expect(401)
			await supertest(BASE_URL).delete('/users/1').expect(401)
		} catch (error) {
			assert.fail(error)
		}
	})
})

test.group('Users CRUD tests', (group) => {
	group.before(async () => {
		await Database.beginGlobalTransaction()
	})

	group.after(async () => {
		await Database.rollbackGlobalTransaction()
	})

	test('POST /users bad params', async () => {
		await supertest(BASE_URL)
			.post('/users')
			.send({
				email: 'test',
				password: 'test',
				password_confirmation: 'test',
				username: 'test',
			})
			.expect(422)
		await supertest(BASE_URL).post('/users').send({ hehe: 'xd' }).expect(422)
		await supertest(BASE_URL)
			.post('/users')
			.send({ email: 'test@test.fr', password: 'test' })
			.expect(422)
		await supertest(BASE_URL)
			.post('/users')
			.send({ email: 'test@test.fr', password: 'test', password_confirmation: 'testa' })
			.expect(422)
		await supertest(BASE_URL)
			.post('/users')
			.send({ email: 'test@test.fr', password: 'test', password_confirmation: 'test' })
			.expect(422)
		await supertest(BASE_URL)
			.post('/users')
			.send({
				email: 'test@test.fr',
				password: 'test',
				password_confirmation: 'test',
				username: 'Bobdslkfjdslfjsdlfkjdslfkjsdsdlkfjsdlkfjsdlkfjdslkjflsdkjflsdkjf',
			})
			.expect(422)
	})
	const auth = { token: '', id: 0 }
	test('POST /users good param', async (assert) => {
		const { body } = await supertest(BASE_URL)
			.post('/users')
			.send({
				email: 'test@test.fr',
				password: 'test',
				password_confirmation: 'test',
				username: 'Test',
			})
			.expect(201)
		assert.exists(body.token?.token)
		assert.exists(body.user?.id)
		assert.exists(body.user?.email)
		assert.exists(body.user?.username)
		auth.token = body.token.token
		auth.id = (await User.firstOrFail()).id
	})
	test('POST /users email not unique', async () => {
		await supertest(BASE_URL)
			.post('/users')
			.send({
				email: 'test@test.fr',
				password: 'hehe',
				password_confirmation: 'hehe',
				username: 'Rat',
			})
			.expect(422)
	})
	test(`PUT /users/${auth.id} without sending token`, async () => {
		await supertest(BASE_URL)
			.put(`/users/${auth.id}`)
			.send({ email: 'test@test.fr', username: 'Henry' })
			.expect(401)
	})
	test(`PUT /users/${auth.id} sending token`, async (assert) => {
		const newEmailValue = 'test@test.com'
		await supertest(BASE_URL)
			.put(`/users/${auth.id}`)
			.set('Authorization', `Bearer ${auth.token}`)
			.send({ email: newEmailValue })
			.expect(422)
		await supertest(BASE_URL)
			.put(`/users/${auth.id}`)
			.set('Authorization', `Bearer ${auth.token}`)
			.send({ email: newEmailValue, username: 'Henry' })
			.expect(200)
		const user = await User.findOrFail(auth.id)
		assert.equal(user.email, newEmailValue)
	})

	test(`GET /users/:id`, async (assert) => {
		const { body } = await supertest(BASE_URL).get(`/users/${auth.id}`).expect(200)
		assert.notExists(body.email)
		assert.exists(body.id)
		assert.exists(body.username)
		await supertest(BASE_URL).get(`/users/123`).expect(404)
	})

	test(`DELETE /users/:id`, async () => {
		await supertest(BASE_URL).delete(`/users/${auth.id}`).expect(401)
		await supertest(BASE_URL)
			.delete(`/users/123`)
			.set('Authorization', `Bearer ${auth.token}`)
			.expect(404)
		const user = await User.create({ email: 'bob@bob.fr', password: 'test', username: 'bob' })
		await supertest(BASE_URL)
			.delete(`/users/${user.id}`)
			.set('Authorization', `Bearer ${auth.token}`)
			.expect(403)
		await supertest(BASE_URL)
			.delete(`/users/${auth.id}`)
			.set('Authorization', `Bearer ${auth.token}`)
			.expect(200)
	})
})
