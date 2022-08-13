import ErrorText from '@/components/shared/ErrorText'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input'
import styled from 'styled-components'

const StyledInput = styled(Input)``

const InputWrapper = styled.div`
	margin: 15px 0;
`

/**
 *
 * @param {*} isError [status, errorMessage]
 * @returns
 *
 */

function AntdInput({
	text,
	isError,
	...rest
}: {
	text: () => JSX.Element
	isError: ['warning' | 'error', string]
	value: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
	// console.log('props', props)
	return (
		<InputWrapper>
			{text && text()}
			<StyledInput status={isError?.[0]} {...rest} />
			<ErrorText>{isError?.length && isError[1]}</ErrorText>
		</InputWrapper>
	)
}

export default AntdInput
