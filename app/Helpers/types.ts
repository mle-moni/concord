interface UserPublicData {
	id: number
	username: string
}

interface UserPrivateData {
	id: number
	email: string
	username: string
}

export { UserPrivateData, UserPublicData }
