const globals = new Map()

function getGlobals(key: string) {
	return globals.get(key)
}

function setGlobals(key: string, val: string) {
	globals.set(key, val)
}

export { getGlobals, setGlobals }
