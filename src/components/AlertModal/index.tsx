import { MessageArgsProps } from 'antd'
import { message } from 'antd'

//error, warning, info, success
//content
function AlertModal({ type = 'success', duration = 3, content = '', ...props }) {
	const config: MessageArgsProps = {
		duration,
		content,
		...props,
	}
	return message[type as keyof Omit<typeof message, 'destroy'>](config)
}

export default AlertModal
