import handleValidation, { ErrorReturn } from 'react-client-validation'

import AlertModal from '@/components/AlertModal'
import AntdButton from '@/components/shared/AntdButton'
import AntdInput from '@/components/shared/AntdInput'
import Text from '@/components/shared/Text'
import { Typography } from 'antd'
import { forgetPasswordEmail } from '@/api/index'
import { useState } from 'react'
import utils from '@/utils'

const { errorMessageHandler, emailTester } = utils
const origin = window.location.origin

function ForgetPassword() {
	const [email, setEmail] = useState<string>('')
	const [loginError, setLoginError] = useState<ErrorReturn>({ email: { msg: null } })
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
		console.log('loginValidationError', loginValidationError)
		setLoginError(loginValidationError)

		if (isPass) {
			await forgetPasswordEmail({
				email,
				origin,
			})
				.then(() => {
					AlertModal({ type: 'success', content: 'Email sent! Check your email!' })
				})
				.catch(({ response }) => AlertModal({ type: 'error', content: response?.data?.message }))
		}
	}
	console.log('loginError', loginError)
	return (
		<>
			<Title>Forget Password</Title>
			<AntdInput
				isError={errorMessageHandler('error', loginError?.email?.msg)}
				value={email}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
				text={() => <Text isRequired={true}>Email</Text>}
			/>
			<AntdButton onClick={handleSubmit}>Send Email</AntdButton>
		</>
	)
}

export default ForgetPassword
