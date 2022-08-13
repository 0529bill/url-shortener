import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
	margin: 15px 0px;
	width: 100%;
`

const StyledButton = styled(Button)`
	width: 100%;
`

function AntdButton({
	text,
	children,
	...props
}: {
	text?: () => JSX.Element
	children?: React.ReactNode
	onClick?: () => void
}) {
	return (
		<ButtonWrapper>
			{text && text()}
			<StyledButton {...props}>{children}</StyledButton>
		</ButtonWrapper>
	)
}

export default AntdButton
