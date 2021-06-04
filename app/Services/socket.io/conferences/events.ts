import { Socket } from 'socket.io'
import { isAuthenticated } from '../state'
import { badInputType } from '../validation'
import { joinRoom, partRoom } from './rooms'

function setupEvents(socket: Socket) {
	socket.on('conferences/signaling', (peerId: string, type: string, body: any) => {
		if (!isAuthenticated(socket.id)) {
			socket.emit('error', '401')
			return
		}
		if (badInputType(peerId, 'string', socket)) return
		if (badInputType(type, 'string', socket)) return
		socket.to(peerId).emit('conferences/signaling', socket.id, type, body)
	})
	socket.on('conferences/joinRoom', (roomName: string) => {
		if (!isAuthenticated(socket.id)) {
			socket.emit('error', '401')
			return
		}
		if (badInputType(roomName, 'string', socket)) return
		joinRoom(roomName, socket)
	})
	socket.on('conferences/partRoom', (roomName: string) => {
		if (!isAuthenticated(socket.id)) {
			socket.emit('error', '401')
			return
		}
		if (badInputType(roomName, 'string', socket)) return
		partRoom(roomName, socket)
	})
}

export { setupEvents as setupConferencesEvents }
