import { UserPublicData } from 'App/Helpers/types'

interface SocketData {
	user: UserPublicData
	conferenceName: string | undefined
}

export { SocketData }
