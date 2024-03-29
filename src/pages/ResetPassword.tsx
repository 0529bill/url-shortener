import { Divider, Typography } from 'antd'
import handleValidation, { ErrorResult, ErrorReturn } from 'react-client-validation'

import AlertModal from '@/components/AlertModal'
import AntdButton from '@/components/shared/AntdButton'
import AntdInput from '@/components/shared/AntdInput'
import { RouteComponentProps } from 'react-router'
import Text from '@/components/shared/Text'
import { resetPassword } from '@/api/index'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import utils from '@/utils'

const { Title, Paragraph } = Typography
const { errorMessageHandler, emailTester } = utils

function ResetPassword({ match }: RouteComponentProps<{ username: string }>) {
	const history = useHistory()
	const [loginError, setLoginError] = useState<ErrorReturn>({ email: { msg: null }, newPassword: { msg: null } })
	const [error, setError] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')

	const handleSubmit = async () => {
		const pathParams = match?.params?.username

		if (!pathParams) {
			return AlertModal({ type: 'error', content: 'Wrong page, missing path params!' })
		}
		const loginValidation = [
			{
				index: 'email',
				condition: [!email],
				errorMessage: 'email is not valid!',
			},
			{
				index: 'newPassword',
				condition: [newPassword?.length < 10],
				errorMessage: 'Password must be larger than 10 letters!',
			},
			{
				index: 'newPassword',
				condition: [!newPassword],
				errorMessage: 'Password is not valid!',
			},
		]

		const [isPass, loginValidationError] = handleValidation({
			errorArray: loginValidation,
			defaultErrorMessage: "input can't be blank",
		})

		setLoginError(loginValidationError)

		if (isPass) {
			await resetPassword({
				email,
				newPassword,
				pathParams,
			})
				.then(() => history.push('/user/signIn'))
				.catch(({ response }) => {
					AlertModal({ type: 'error', content: response?.data?.message })
					return setError('Reset failed')
				})
		}
	}
	return (
		<>
			<Title>Reset new password</Title>
			<AntdInput
				isError={errorMessageHandler('error', loginError.email?.msg)}
				value={email}
				onChange={({ target: { value } }) => setEmail(value)}
				text={() => <Text isRequired={true}>Your email:</Text>}
			/>
			<AntdInput
				isError={errorMessageHandler('error', loginError.newPassword?.msg)}
				value={newPassword}
				onChange={({ target: { value } }) => setNewPassword(value)}
				text={() => <Text isRequired={true}>New password:</Text>}
			/>
			<AntdButton onClick={handleSubmit}>Submit</AntdButton>
			{error && <Text style={{ color: 'red' }}>Reset password failed</Text>}
		</>
	)
}

export default ResetPassword
