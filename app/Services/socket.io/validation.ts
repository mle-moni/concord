import { Socket } from 'socket.io'

type TypeofTypes =
	| 'string'
	| 'number'
	| 'bigint'
	| 'boolean'
	| 'symbol'
	| 'undefined'
	| 'object'
	| 'function'

function badInputType(input: any, type: TypeofTypes | 'boolean', socket: Socket) {
	// eslint-disable-next-line valid-typeof
	if (typeof input !== type) {
		socket.emit('error', '400', `error at joinRoom, expected a string but got ${typeof input}`)
		return true
	}
	return false
}

export { badInputType }
