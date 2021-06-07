import { SocketData } from './types'

const socketsData = new Map<string, SocketData>()

function getSocketData(socketId: string) {
	return socketsData.get(socketId)
}

function setSocketData(socketId: string, val: SocketData) {
	socketsData.set(socketId, val)
}

function delSocketData(socketId: string) {
	return socketsData.delete(socketId)
}

function isAuthenticated(socketId: string) {
	return !!getSocketData(socketId)
}

export { getSocketData, setSocketData, delSocketData, isAuthenticated }
