import AntdButton from '@/components/shared/AntdButton'
import Container from '@/components/style/Container'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import styled from 'styled-components'

const { Title } = Typography

const StyledContainer = styled(Container)`
	flex-direction: column;
	padding: 50px;
`
function Main() {
	return (
		<StyledContainer>
			<Title>Welcome to TinyURL, the best url shortener in the world!</Title>
			<div>Sign in to generate TinyURL</div>
			<AntdButton>
				<Link to="/user/signIn">Sign In</Link>
			</AntdButton>
		</StyledContainer>
	)
}

export default Main
