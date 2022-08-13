import styled from 'styled-components'

const Text = styled.div`
	color: red;
	font-size: 1.1rem;
`

function ErrorText({ children, ...props }: { children?: React.ReactNode; style?: React.CSSProperties }) {
	return <Text {...props}>{children}</Text>
}

export default ErrorText
