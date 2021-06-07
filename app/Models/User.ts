import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

import { UserPublicData, UserPrivateData } from 'app/Helpers/types'

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public email: string

	@column({ serializeAs: null })
	public password: string

	@column()
	public rememberMeToken?: string

	@column()
	public username: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password)
		}
	}

	public publicData(): UserPublicData {
		return {
			id: this.id,
			username: this.username,
		}
	}
	public privateData(): UserPrivateData {
		return {
			id: this.id,
			email: this.email,
			username: this.username,
		}
	}
}
