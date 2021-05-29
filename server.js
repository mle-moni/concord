const express = require('express')
const app = express()

const server = require('http').createServer(app)
app.use(express.static('public'))

const io = require('socket.io')(server)

const room = 'main_room'

// socket ids of the room users
const roomUsers = new Set()
function getArrayFromSet(set) {
	const arr = []
	for (let elem of set) {
		arr.push(elem)
	}
	return arr
}

io.sockets.on('connection', socket => {
	socket.emit('msg', 'connection OK')
	socket.emit('myId', socket.id)

	socket.on('disconnect', () => {
		if (roomUsers.has(socket.id)) {
			roomUsers.delete(socket.id)
			io.to(room).emit('userGone', socket.id)
		}
	})

	socket.on('joinRoom', () => {
		if (roomUsers.has(socket.id)) {
			return
		}
		socket.join(room)
		socket.emit('getRoomUsers', getArrayFromSet(roomUsers))
		roomUsers.add(socket.id)
	})

	socket.on('signaling', (peerId, type, body) => {
		socket.to(peerId).emit('signaling', socket.id, type, body)
	})
})

const PORT = 7890
server.listen(PORT, () => console.info(`Concord available at http://localhost:${PORT}`));