import { Divider, Typography } from 'antd'

import AntdButton from '@/components/shared/AntdButton'
import AntdInput from '@/components/shared/AntdInput'
import Container from '@/components/style/Container'
import ErrorText from '@/components/shared/ErrorText'
import Text from '@/components/shared/Text'
import handleValidation from 'react-client-validation'
import styled from 'styled-components'
import { useCustomContext } from '@/contextProvider'
import { useState } from 'react'
import utils from '@/utils'

const { Title, Paragraph } = Typography

const StyledContainer = styled(Container)`
	flex-direction: column;
	padding: 50px;
`

function SignIn() {
	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)
	const [signInError, setSignInError] = useState({
		username: null,
		password: null,
	})
	const [passedResult, setPassedResult] = useState(null)
	const { userSignIn } = useCustomContext()
	const { errorMessageHandler } = utils

	const handleSubmit = async () => {
		const loginValidation = [
			{
				index: 'username',
				condition: [username?.length < 10],
				errorMessage: 'Username must be larger than 10 letters!',
			},
			{
				index: 'username',
				condition: [!username],
				errorMessage: 'User name is not valid!',
			},
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
		]

		const [isPass, loginValidationError] = handleValidation({
			errorArray: loginValidation,
			defaultErrorMessage: "input can't be blank",
		})

		setSignInError(loginValidationError)

		if (isPass) {
			const userInfo = { username, password }
			await userSignIn({
				userInfo,
				setPassedResult,
				// history,
			})
		}
	}

	return (
		<StyledContainer>
			<Title>Sign in to TinyURL</Title>
			<AntdInput
				isError={errorMessageHandler('error', signInError.username?.msg)}
				value={username}
				onChange={({ target: { value } }) => setUsername(value)}
				text={() => <Text isRequired={true}>Username</Text>}
			/>
			<AntdInput
				isError={errorMessageHandler('error', signInError.password?.msg)}
				value={password}
				onChange={({ target: { value } }) => setPassword(value)}
				text={() => <Text isRequired={true}>Password</Text>}
			/>
			Forget password?
			<AntdButton onClick={handleSubmit}>Submit</AntdButton>
			<ErrorText style={{ margin: '10px 0' }}>{passedResult && passedResult?.msg}</ErrorText>
		</StyledContainer>
	)
}

export default SignIn
