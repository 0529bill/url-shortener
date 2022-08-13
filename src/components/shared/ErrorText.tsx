import styled from 'styled-components'

const Text = styled.div`
	color: red;
	font-size: 1.1rem;
`

function ErrorText({ children }: { children: React.ReactNode }) {
	return <Text>{children}</Text>
}

export default ErrorText
