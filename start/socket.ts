import { initSocketAuth, setupEvents } from 'App/Services/socket.io/events'
import Ws from 'App/Services/socket.io/Ws'
import { Socket } from 'socket.io'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket: Socket) => {
	initSocketAuth(socket)
	setupEvents(socket)
})
