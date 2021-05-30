import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Root path of the API', () => {
	test('GET /', async (assert) => {
		try {
			const { body } = await supertest(BASE_URL).get('/').expect(200)
			assert.exists(body.concord)
			assert.equal(body.concord, 'Discord like, self hosted solution')
		} catch (error) {
			assert.fail(error)
		}
	})
})
