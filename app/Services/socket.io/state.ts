interface SocketData {
	userId: number
}
const socketsData = new Map<string, SocketData>()

function getSocketData(key: string) {
	return socketsData.get(key)
}

function setSocketData(key: string, val: SocketData) {
	socketsData.set(key, val)
}

function delSocketData(key: string) {
	return socketsData.delete(key)
}

export { getSocketData, setSocketData, delSocketData }
