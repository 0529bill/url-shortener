function errorMessageHandler(status: 'error' | 'warning', msg: string | null): ['error' | 'warning', string] {
	return msg ? [status, msg] : ['error', 'errorMessageHandlerWentWrong']
}

export default errorMessageHandler
