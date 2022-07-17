import AntdButton from '@/components/shared/AntdButton'
import AntdInput from '@/components/shared/AntdInput'
import { useCustomContext } from '@/contextProvider'

function SignIn() {
	const { userSignIn } = useCustomContext()
	const onFinish = (values) => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<>
			<AntdInput
				// isError={errorMessageHandler('error', loginError.username?.msg)}
				// value={username}
				// onChange={({ target: { value } }) => setUsername(value)}
				text={() => <div>Username</div>}
			/>
		</>
	)
}

export default SignIn
