import { COLOR } from '@/constants'
import React from 'react'
import styled from 'styled-components'

type StyledTagProp = {
	isRequired: boolean
}

const StyledTag = styled.div<StyledTagProp>`
	&:before {
		display: inline-block;
		margin-right: 4px;
		color: ${COLOR.RED};
		font-size: 0.875rem;
		line-height: 1;
		content: '${(props) => (props.isRequired ? '*' : null)}';
	}
`

function Text({
	children,
	isRequired = false,
	...props
}: {
	children?: React.ReactNode
	isRequired?: boolean
	style?: Record<string, unknown>
}) {
	return (
		<>
			<StyledTag isRequired={isRequired} {...props}>
				{children}
			</StyledTag>
		</>
	)
}

export default Text
