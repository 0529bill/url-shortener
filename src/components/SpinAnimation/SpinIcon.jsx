import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import styled from 'styled-components'

const SpinWrapper = styled.div`
	justify-content: center;
	align-items: center;
	display: flex;
`

function SpinIcon(isSpinning) {
	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 50,
			}}
			spin
		/>
	)
	return (
		<SpinWrapper>
			<Spin indicator={antIcon} spinning={true} />
		</SpinWrapper>
	)
}

export default SpinIcon
