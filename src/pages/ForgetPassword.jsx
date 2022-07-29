import AlertModal from '@/components/AlertModal'
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
			await forgetPasswordEmail({
				email,
				origin,
			})
				.then((resp) => {
					AlertModal({ type: 'success', content: 'Email sent! Check your email!' })
				})
				.catch(({ response }) => AlertModal({ type: 'error', content: response?.data?.message }))
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
