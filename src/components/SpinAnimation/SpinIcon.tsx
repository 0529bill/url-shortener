import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import styled from 'styled-components'

const SpinWrapper = styled.div`
	justify-content: center;
	align-items: center;
	display: flex;
`
type Props = { isSpinning: boolean }

const SpinIcon: React.FC<Props> = ({ isSpinning }: Props) => {
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
			<Spin indicator={antIcon} spinning={isSpinning} />
		</SpinWrapper>
	)
}

export default SpinIcon
