import { checkToken } from 'App/Helpers/RedisToken'
import User from 'App/Models/User'
import { Socket } from 'socket.io'
import { getSocketData, setSocketData } from './state'

async function authenticate(socket: Socket, token: string): Promise<void> {
	if (!token || typeof token !== 'string') {
		socket.emit('auth', 'failure')
		return
	}
	if (getSocketData(socket.id)) {
		socket.emit('auth', 'success')
		return
	}
	try {
		const userId = await checkToken(token)
		const user = await User.find(userId)
		if (!user) {
			socket.emit('error', '404', 'user not found')
			return
		}
		setSocketData(socket.id, { user: user.publicData(), conferenceName: undefined })
		socket.join('connected')
		socket.emit('auth', 'success')
	} catch (error) {
		socket.emit('auth', 'failure')
	}
}

export { authenticate }
