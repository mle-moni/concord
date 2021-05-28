const express = require('express')
const app = express()

const server = require('http').createServer(app)
app.use(express.static('public'))

const io = require('socket.io')(server)

io.sockets.on('connection', socket => {
	socket.emit('msg', 'connection OK')
})

const PORT = 7890
server.listen(PORT, () => console.log(`Concord available at http://localhost:${PORT}`));