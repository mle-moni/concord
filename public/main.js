const socket = io.connect(location.origin)

socket.on('msg', msg => console.log(msg))
