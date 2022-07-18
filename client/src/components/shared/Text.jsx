import { COLOR } from '@/constants'
import styled from 'styled-components'

function Text({ tagName = 'div', children, isRequired = false }) {
	const Tag = tagName

	const StyledTag = styled(Tag)`
		&:before {
			display: inline-block;
			margin-right: 4px;
			color: ${COLOR.RED};
			font-size: 0.875rem;
			line-height: 1;
			content: '${(props) => (props.isRequired ? '*' : null)}';
		}
	`
	return (
		<>
			<StyledTag isRequired={isRequired}>{children}</StyledTag>
		</>
	)
}

export default Text
