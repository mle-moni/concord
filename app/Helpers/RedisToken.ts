import Redis from '@ioc:Adonis/Addons/Redis'
import { createHash } from 'crypto'
import { safeEqual } from '@poppinss/utils/build/helpers'

function compatibleAtob(str: string) {
	return Buffer.from(str, 'base64').toString('binary')
}

function generateHash(token: string) {
	return createHash('sha256').update(token).digest('hex')
}

function parseToken(token: string) {
	const parts = token.split('.')
	if (parts.length !== 2) {
		throw new Error('E_INVALID_API_TOKEN')
	}
	return {
		tokenId: compatibleAtob(parts[0]),
		tokenHash: generateHash(parts[1]),
	}
}

// return userId or throw error
async function checkToken(token: string): Promise<number> {
	const parsedToken = parseToken(token)
	const apiTokenSerialised = await Redis.get(`api:${parsedToken.tokenId}`)
	if (!apiTokenSerialised) {
		throw new Error('E_INVALID_API_TOKEN')
	}
	const apiToken = JSON.parse(apiTokenSerialised)
	if (!safeEqual(apiToken.token, parsedToken.tokenHash)) {
		throw new Error('E_INVALID_API_TOKEN')
	}
	return <number>apiToken.user_id
}

export { checkToken }
