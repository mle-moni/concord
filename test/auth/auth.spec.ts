import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

interface Token {
	type: string
	token: string
}

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('login', (group) => {
	group.before(async () => {
		await Database.beginGlobalTransaction()
	})

	group.after(async () => {
		await Database.rollbackGlobalTransaction()
	})
	let user: User | null = null
	const email = 'test@test.fr'
	const password = 'superPassword!!!!'
	test('POST /login bad credentials', async (assert) => {
		user = await User.create({ email, password, username: 'bob' })
		const { body } = await supertest(BASE_URL)
			.post('/login')
			.send({ email: 'raton@web.fr', password })
			.expect(400)
		assert.exists(body.errors)
		assert.exists(body.errors[0])
		assert.exists(body.errors[0].message)
		assert.equal(body.errors[0].message, 'Invalid user credentials')
	})
	test('POST /login no credentials', async (assert) => {
		const { body } = await supertest(BASE_URL).post('/login').send({}).expect(400)
		assert.exists(body.errors)
		assert.exists(body.errors[0])
		assert.exists(body.errors[0].message)
		assert.equal(body.errors[0].message, 'Invalid user credentials')
	})
	test('POST /login good credentials', async (assert) => {
		let token: Token
		const { body } = await supertest(BASE_URL)
			.post('/login')
			.send({ email, password })
			.expect(200)
		assert.exists(body?.token?.token)
		assert.exists(body?.user)
		token = <Token>body.token
		await supertest(BASE_URL)
			.delete(`/users/${user?.id}`)
			.set('Authorization', `Bearer ${token.token}`)
			.expect(200)
	})
})

test.group('logout', (group) => {
	group.before(async () => {
		await Database.beginGlobalTransaction()
	})

	group.after(async () => {
		await Database.rollbackGlobalTransaction()
	})
	let user: User | null = null
	const email = 'test@test.fr'
	const password = 'superPassword!!!!'
	test('POST /logout bad token', async () => {
		user = await User.create({ email, password, username: 'bob' })
		await supertest(BASE_URL).post('/logout').expect(401)
		await supertest(BASE_URL)
			.post('/logout')
			.set('Authorization', `Bearer qw.poifqwfkjfwlqkj`)
			.expect(401)
	})
	test('POST /logout good token', async (assert) => {
		let token: Token
		const { body } = await supertest(BASE_URL)
			.post('/login')
			.send({ email, password })
			.expect(200)
		token = <Token>body.token
		const res = await supertest(BASE_URL)
			.post('/logout')
			.set('Authorization', `Bearer ${token.token}`)
			.expect(200)
		assert.exists(res?.body?.message)
		assert.equal(res?.body?.message, 'Ok')
		// test that token is revoked
		await supertest(BASE_URL)
			.delete(`/users/${user?.id}`)
			.set('Authorization', `Bearer ${token.token}`)
			.expect(401)
	})
})

test.group('me', (group) => {
	group.before(async () => {
		await Database.beginGlobalTransaction()
	})

	group.after(async () => {
		await Database.rollbackGlobalTransaction()
	})
	let user: User | null = null
	const email = 'pouet@pouet.fr'
	const password = 'superPassword!!!!'

	test('GET /me bad token', async () => {
		user = await User.create({ email, password, username: 'bob' })
		await supertest(BASE_URL).get('/me').set('Authorization', `Bearer hehe.xd`).expect(401)
	})

	test('GET /me good token', async (assert) => {
		let token: Token
		const res = await supertest(BASE_URL).post('/login').send({ email, password }).expect(200)
		token = <Token>res.body.token
		const { body } = await supertest(BASE_URL)
			.get('/me')
			.set('Authorization', `Bearer ${token.token}`)
			.expect(200)
		const connectedUser = body.user
		assert.equal(connectedUser.id, user?.id)
		assert.equal(connectedUser.email, user?.email)
		assert.equal(connectedUser.username, user?.username)
	})
})
