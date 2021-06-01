import { ApplicationContract } from '@ioc:Adonis/Core/Application'

import { setGlobals } from 'App/Helpers/Globals'

export default class AppProvider {
	constructor(protected app: ApplicationContract) {
		let tokenLifeTime = '7days'
		if (app.env.get('NODE_ENV') === 'testing') {
			tokenLifeTime = '10secs'
		}
		setGlobals('token_life_time', tokenLifeTime)
	}

	public register() {
		// Register your own bindings
	}

	public async boot() {
		// IoC container is ready
	}

	public async ready() {
		// App is ready
		if (this.app.environment === 'web') {
			await import('../start/socket')
		}
	}

	public async shutdown() {
		// Cleanup, since app is going down
	}
}
