import { Divider, Typography } from 'antd'
import handleValidation, { ErrorReturn } from 'react-client-validation'

import AntdButton from '@/components/shared/AntdButton'
import AntdInput from '@/components/shared/AntdInput'
import { COLOR } from '@/constants'
import Container from '@/components/style/Container'
import ErrorText from '@/components/shared/ErrorText'
import { Link } from 'react-router-dom'
import Text from '@/components/shared/Text'
import styled from 'styled-components'
import { useCustomContext } from '@/contextProvider'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import utils from '@/utils'

const { Title, Paragraph } = Typography

const { errorMessageHandler, emailTester } = utils
const StyledContainer = styled(Container)`
	flex-direction: column;
	padding: 50px;
`

function LoginPage() {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [loginError, setLoginError] = useState<ErrorReturn | null>(null)
	const [passedResult, setPassedResult] = useState<{ msg: string } | null>(null)
	const { createUser } = useCustomContext()

	let history = useHistory()
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
				index: 'email',
				condition: [email && !emailTester(email)],
				errorMessage: 'Email must be valid',
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

		setLoginError(loginValidationError)

		if (isPass) {
			const userInfo = { username, password, email }
			await createUser({
				userInfo,
				setPassedResult,
				history,
			})
		}
	}
	return (
		<>
			<StyledContainer>
				<Title>Sign up and start Sharing</Title>
				Already have an account? <Link to="/user/signIn">Sign In.</Link>
				Sign up with:
				<Divider>OR</Divider>
				<AntdInput
					isError={errorMessageHandler('error', loginError?.username?.msg || null)}
					value={username}
					onChange={({ target: { value } }) => setUsername(value)}
					text={() => <Text isRequired={true}>Username</Text>}
				/>
				<AntdInput
					isError={errorMessageHandler('error', loginError?.email?.msg || null)}
					value={email}
					onChange={({ target: { value } }) => setEmail(value)}
					text={() => <Text isRequired={true}>Email</Text>}
				/>
				<AntdInput
					isError={errorMessageHandler('error', loginError?.password?.msg || null)}
					value={password}
					onChange={({ target: { value } }) => setPassword(value)}
					text={() => <Text isRequired={true}>Password</Text>}
				/>
				<AntdButton onClick={handleSubmit}>Sign up</AntdButton>
				<ErrorText style={{ margin: '10px 0' }}>{passedResult && passedResult?.msg}</ErrorText>
				By signing up with an account, you agree to TinyURL's Terms of Service, Privacy Policy and Acceptable
				Use Policy.
			</StyledContainer>
		</>
	)
}

export default LoginPage
