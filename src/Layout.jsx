import { Layout as AntdLayout } from 'antd'
import { BREAK_POINT } from '@/constants'
import { COLOR } from '@/constants'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import styled from 'styled-components'
const { Content: AntdContent, Footer: AntdFooter, Header: AntdHeader } = AntdLayout
const StyledAntdLayout = styled(AntdLayout)`
	min-height: 100vh;
	font-family: 'Source Code Pro', monospace;
	font-size: 16px;
	/* color: COLOR_BLACK; */
`

const StyledAntdHeader = styled(AntdHeader)`
	display: flex;
	background: white;
	width: 100%;
`

const StyledAntdContent = styled(AntdContent)`
	padding: 0 0px;
	background: white;
	@media ${BREAK_POINT['mobileM']} {
		padding: 0 100px;
	}
	@media ${BREAK_POINT['desktopS']} {
		padding: 0 150px;
	}
	@media ${BREAK_POINT['desktopL']} {
		padding: 0 200px;
	}
	@media ${BREAK_POINT['desktopXl']} {
		padding: 0 300px;
	}
`

const StyledAntdFooter = styled(AntdFooter)`
	background: white;
`

function Layout({ children }) {
	return (
		<StyledAntdLayout>
			{/* <StyledAntdHeader> */}
			<Navbar />
			{/* </StyledAntdHeader> */}
			<StyledAntdContent>{children}</StyledAntdContent>
			<StyledAntdFooter>
				<Footer />
			</StyledAntdFooter>
		</StyledAntdLayout>
	)
}

export default Layout
