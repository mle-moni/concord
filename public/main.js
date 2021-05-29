const socket = io.connect(location.origin)

// id is only for debug purposes
const me = { id: '', ready: false }

socket.on('msg', msg => console.info(msg))
socket.on('myId', id => me.id = id)

const myVideo = {
	elem: document.getElementById('main-video'),
	audioSource: document.getElementById('audio-source'),
	videoSource: document.getElementById('video-source'),
	stream: null,
}
myVideo.audioSource.onchange = getStream
myVideo.videoSource.onchange = getStream

function getStream() {
	if (myVideo.stream) {
		myVideo.stream.getTracks().forEach(track => track.stop())
	}
	const audioSourceValue = myVideo.audioSource.value
	const videoSourceValue = myVideo.videoSource.value
	const constraints = {
		audio: { deviceId: audioSourceValue ? { exact: audioSourceValue } : undefined },
		video: { deviceId: videoSourceValue ? { exact: videoSourceValue } : undefined },
	}
	return navigator.mediaDevices
		.getUserMedia(constraints)
		.then(newStream)
		.catch(e => console.error(e))
}

function newStream(stream) {
	myVideo.audioSource.selectedIndex = [...myVideo.audioSource.options].findIndex(
		option => option.text === stream.getAudioTracks()[0].label
	)
	myVideo.videoSource.selectedIndex = [...myVideo.videoSource.options].findIndex(
		option => option.text === stream.getVideoTracks()[0].label
	)
	myVideo.stream = stream
	myVideo.elem.srcObject = stream
	if (me.ready) {
		socket.emit('joinRoom')
	}
}

// create a stream in order to init #video-source and #audio-source options
function initStreamSource() {
	getStream()
		.then(() => navigator.mediaDevices.enumerateDevices())
		.then(deviceInfos => {
			window.deviceInfos = deviceInfos
			for (let device of deviceInfos) {
				const option = document.createElement('option')
				option.value = device.deviceId
				if (device.kind === 'videoinput') {
					option.text = device.label || `camera with no label`
					myVideo.videoSource.appendChild(option)
				} else if (device.kind === 'audioinput') {
					option.text = device.label || 'mic with no label'
					myVideo.audioSource.appendChild(option)
				}
			}
		})
}

function joinRoom() {
	me.ready = true
	getStream()
}

initStreamSource()

const peers = new Peers(socket)

socket.on('getRoomUsers', usersArray => {
	for (let peerId of usersArray) {
		peers.addPeer(peerId)
	}
})