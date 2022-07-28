import { Divider, Typography } from 'antd'

import AlertModal from '@/components/AlertModal'
import AntdButton from '@/components/shared/AntdButton'
import AntdInput from '@/components/shared/AntdInput'
import Text from '@/components/shared/Text'
import handleValidation from 'react-client-validation'
import { resetPassword } from '@/api/index'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import utils from '@/utils'

const { Title, Paragraph } = Typography
const { errorMessageHandler, emailTester } = utils

function ResetPassword({ match }) {
	const history = useHistory()
	const [loginError, setLoginError] = useState({
		password: null,
	})
	const [error, setError] = useState('set')
	const [password, setPassword] = useState(null)
	const [newPassword, setNewPassword] = useState(null)

	const handleSubmit = async () => {
		const pathParams = match?.params?.username

		if (!pathParams) {
			return AlertModal({ type: 'error', content: 'Wrong page, missing path params!' })
		}
		const loginValidation = [
			{
				index: 'password',
				condition: [password?.length < 10],
				errorMessage: 'Password must be larger than 10 letters!',
			},
			{
				index: 'password',
				condition: [!password],
				errorMessage: 'Password is not valid!',
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
			{
				index: 'password',
				condition: [newPassword === password],
				errorMessage: "Password can't be the same!",
			},
			{
				index: 'newPassword',
				condition: [newPassword === password],
				errorMessage: "Password can't be the same!",
			},
		]

		const [isPass, loginValidationError] = handleValidation({
			errorArray: loginValidation,
			defaultErrorMessage: "input can't be blank",
		})

		setLoginError(loginValidationError)

		if (isPass) {
			// const userInfo = { username, password, email }
			const respond = await resetPassword({
				// userInfo,
				// setPassedResult,
				// history,
				password,
				newPassword,
				pathParams,
			})
			console.log('respond', respond)
			if (respond?.status === '200') {
				history.push('/user/signIn')
			} else {
				setError('Reset failed')
			}
		}
	}
	return (
		<>
			<Title>Reset new password</Title>
			<AntdInput
				isError={errorMessageHandler('error', loginError.password?.msg)}
				value={password}
				onChange={({ target: { value } }) => setPassword(value)}
				text={() => <Text isRequired={true}>Your old password:</Text>}
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
