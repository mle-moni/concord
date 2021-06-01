import { Socket } from 'socket.io'
import { authenticate } from './auth'
import { delSocketData } from './state'

function setupEvents(socket: Socket) {
	socket.on('auth', (token: string) => {
		authenticate(socket, token)
	})
	socket.on('disconnect', () => {
		delSocketData(socket.id)
	})
}

function initSocketAuth(socket: Socket) {
	socket.emit('auth', 'request')
}

export { setupEvents, initSocketAuth }
