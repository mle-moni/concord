import { UserPublicData } from 'App/Helpers/types'
import { Socket } from 'socket.io'
import { getSocketData, setSocketData } from '../state'

const rooms = new Map<string, Set<string>>()

const DEBUG = false

function logRoomSize(roomName: string, room: Set<string>) {
	console.log(`${roomName}: ${room.size} users`)
}

function getRoomData(roomName: string) {
	let room = rooms.get(roomName)
	if (!room) {
		room = new Set<string>()
		rooms.set(roomName, room)
	}
	return room
}

function deleteRoom(roomName: string) {
	return rooms.delete(roomName)
}

function isInRoomByName(roomName: string, socket: Socket) {
	const room = getRoomData(roomName)
	if (room.size === 0) {
		deleteRoom(roomName)
		return false
	}
	return isInRoom(room, socket)
}

function isInRoom(room: Set<string>, socket: Socket) {
	return room.has(socket.id)
}

function getRoomUsers(room: Set<string>) {
	const arr: { socketId: string; user: UserPublicData }[] = []
	for (let socketId of room) {
		const data = getSocketData(socketId)
		if (!data) continue
		arr.push({ socketId, user: data.user })
	}
	return arr
}

function joinRoom(roomName: string, socket: Socket) {
	if (roomName.length === 0) {
		socket.emit('error', '400', { message: 'roomName too short' })
		return
	}
	const socketData = getSocketData(socket.id)!
	socket
		.to(roomName)
		.emit('conferences/setUserData', { socketId: socket.id, user: socketData.user })
	const room = getRoomData(roomName)
	if (isInRoom(room, socket)) {
		return
	}
	socketData.conferenceName = roomName
	setSocketData(socket.id, socketData)
	socket.join(roomName)
	socket.emit('conferences/getRoomUsers', getRoomUsers(room))
	room.add(socket.id)
	if (DEBUG) logRoomSize(roomName, room)
}

function partRoom(roomName: string, socket: Socket) {
	const room = getRoomData(roomName)
	if (isInRoom(room, socket)) {
		room.delete(socket.id)
		socket.to(roomName).emit('conferences/userGone', socket.id)
	}
	if (DEBUG) logRoomSize(roomName, room)
	if (room.size === 0) {
		if (DEBUG) console.log(`deleting ${roomName}`)
		deleteRoom(roomName)
	}
}

export { getRoomData, joinRoom, partRoom, isInRoom, isInRoomByName }
