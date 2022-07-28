import AntdButton from '@/components/shared/AntdButton'
import AntdInput from '@/components/shared/AntdInput'
import Text from '@/components/shared/Text'
import { Typography } from 'antd'
import { forgetPasswordEmail } from '@/api/index'
import handleValidation from 'react-client-validation'
import { useState } from 'react'
import utils from '@/utils'

const { errorMessageHandler, emailTester } = utils
const origin = window.location.origin
console.log('loc', origin)
function ForgetPassword() {
	const [email, setEmail] = useState(null)
	const [loginError, setLoginError] = useState({ email: null })
	const { Title } = Typography

	const handleSubmit = async () => {
		const loginValidation = [
			{
				index: 'email',
				condition: [email && !emailTester(email)],
				errorMessage: 'Email must be valid',
			},
		]

		const [isPass, loginValidationError] = handleValidation({
			errorArray: loginValidation,
			defaultErrorMessage: "input can't be blank",
		})

		setLoginError(loginValidationError)

		if (isPass) {
			const respond = await forgetPasswordEmail({
				email,
				origin,
			})
			console.log('respond', respond)
			// await createUser({
			// 	userInfo,
			// 	setPassedResult,
			// 	history,
			// })
		}
	}
	return (
		<>
			<Title>Forget Password</Title>
			<AntdInput
				isError={errorMessageHandler('error', loginError.email?.msg)}
				value={email}
				onChange={({ target: { value } }) => setEmail(value)}
				text={() => <Text isRequired={true}>Email</Text>}
			/>
			<AntdButton onClick={handleSubmit}>Send Email</AntdButton>
		</>
	)
}

export default ForgetPassword
