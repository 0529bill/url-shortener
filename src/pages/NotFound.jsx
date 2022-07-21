import Container from '@/components/style/Container'
import Lottie from 'lottie-react'
import notFoundImage from '@/assets/notFoundImage'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
	flex-direction: column;
	padding: 50px;
	width: 600px;
	justify-content: center;
`
function NotFound() {
	const Example = () => {
		return <Lottie animationData={notFoundImage} />
	}
	return (
		<StyledContainer>
			<Example />
		</StyledContainer>
	)
}

export default NotFound
