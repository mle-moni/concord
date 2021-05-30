const messages = {
	forbidden: 'ressource has a restricted access',
	notFound: 'ressource not found',
	destroyed: 'ressource destroyed',
	updated: 'ressource updated',
	ok: 'Ok',
}
const messagesObj = {
	forbidden: { message: messages.forbidden },
	notFound: { message: messages.notFound },
	destroyed: { message: messages.destroyed },
	updated: { message: messages.updated },
	ok: { message: messages.ok },
}
export { messages, messagesObj }
