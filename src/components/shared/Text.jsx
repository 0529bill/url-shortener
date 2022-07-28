import { COLOR } from '@/constants'
import styled from 'styled-components'

const StyledTag = styled.div`
	&:before {
		display: inline-block;
		margin-right: 4px;
		color: ${COLOR.RED};
		font-size: 0.875rem;
		line-height: 1;
		content: '${(props) => (props.isRequired ? '*' : null)}';
	}
`

function Text({ children, isRequired = false, ...props }) {
	return (
		<>
			<StyledTag isRequired={isRequired} {...props}>
				{children}
			</StyledTag>
		</>
	)
}

export default Text
