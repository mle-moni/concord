import { Socket } from 'socket.io'
import { authenticate } from './auth'
import { delSocketData, getSocketData } from './state'
import { setupConferencesEvents } from './conferences/events'
import { partRoom } from './conferences/rooms'
import { badInputType } from './validation'

function setupEvents(socket: Socket) {
	socket.on('auth', (token: string) => {
		if (badInputType(token, 'string', socket)) return
		authenticate(socket, token)
	})
	socket.on('disconnect', () => {
		const socketData = getSocketData(socket.id)
		if (socketData && socketData.conferenceName) {
			partRoom(socketData.conferenceName, socket)
		}
		delSocketData(socket.id)
	})
	setupConferencesEvents(socket)
}

function initSocketAuth(socket: Socket) {
	socket.emit('auth', 'request')
}

export { setupEvents, initSocketAuth }
