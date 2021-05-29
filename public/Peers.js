class Peers {
	constructor(socket) {
		this.socket = socket
		this.peers = new Map()
		this.constraints = { audio: true, video: true }
		this.config = {
			iceServers: [
				{
					'urls': 'stun:stun.l.google.com:19302',
				},
				{
					'urls': 'turn:mle-moni.fr',
					'username': 'test',
					'credential': 'test123'
				}
			]
		}
		this.selfVideo = document.getElementById('main-video')
		this.peersVideosContainer = document.getElementById('peers-videos')
		this.setupEvents()
	}
	setupEvents() {
		this.socket.on('userGone', peerId => {
			const pc = this.peers.get(peerId)
			if (!pc) return
			const peerVideo = document.getElementById(`peer_video_${peerId}`)
			peerVideo.parentNode.removeChild(peerVideo)
			pc.close()
			this.peers.delete(peerId)
		})
		this.socket.on('signaling', (peerId, type, body) => {
			let pc = this.peers.get(peerId)
			const description = body
			const candidate = body
			switch (type) {
				case 'offer':
					pc = this.createPeerConnection(peerId)
					pc.setRemoteDescription(description)
						.then(() => pc.createAnswer())
						.then(sdp => pc.setLocalDescription(sdp))
						.then(() => {
							socket.emit('signaling', peerId, 'answer', pc.localDescription)
						})
					break
				case 'candidate':
					pc.addIceCandidate(new RTCIceCandidate(candidate))
					break
				case 'answer':
					pc.setRemoteDescription(description)
					break
				default:
					console.error(`Unknown signaling event: ${type}`)
			}
		})
	}
	getAll() {
		return this.peers
	}
	createPeerConnection(peerId) {
		const peerVideo = this.createVideoElement(peerId)
		const pc = new RTCPeerConnection(this.config)
		this.peers.set(peerId, pc)
		this.setupIceEvent(pc, peerId)
		this.setupPeerStreamEvent(pc, peerVideo)
		this.sendStreamToPeer(pc)
		return pc
	}
	sendStreamToPeer(pc) {
		const stream = this.selfVideo.srcObject
		stream.getTracks().forEach(track => pc.addTrack(track, stream))
	}
	// setup peer and start signaling process
	addPeer(peerId) {
		const pc = this.createPeerConnection(peerId)

		pc.createOffer()
			.then(sdp => pc.setLocalDescription(sdp))
			.then(() => {
				this.socket.emit('signaling', peerId, 'offer', pc.localDescription)
			})
	}
	setupIceEvent(pc, peerId) {
		pc.onicecandidate = event => {
			if (event.candidate) {
				this.socket.emit('signaling', peerId, 'candidate', event.candidate)
			}
		}
	}
	setupPeerStreamEvent(pc, peerVideo) {
		pc.ontrack = event => {
			peerVideo.srcObject = event.streams[0]
		}
	}
	createVideoElement(peerId) {
		const video = document.createElement('video')
		video.setAttribute('playsinline', '')
		video.setAttribute('autoplay', '')
		video.id = `peer_video_${peerId}`
		this.peersVideosContainer.appendChild(video)
		return video
	}
}