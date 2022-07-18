import { Button, Input, Typography } from 'antd'
import React, { useState } from 'react'

import Container from '@/components/style/Container'
import { QRCodeSVG } from 'qrcode.react'
import styled from 'styled-components'
import { useCustomContext } from '@/contextProvider'

const { Title, Paragraph } = Typography
const { Search } = Input
const StyledContainer = styled(Container)`
	flex-direction: column;
	padding: 50px;
`
const StyledButton = styled(Button)`
	margin: 10px 0;
	width: 150px;
`

const UrlContainer = styled(Container)`
	margin: 30px 10px;
	flex-direction: column;
`
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
function Shortener() {
	const [searchState, setSearchState] = useState(null)
	const [generateQRcode, setGenerateQRcode] = useState(false)
	const { urlRequestSent, urlRequestData } = useCustomContext()

	const handleSearchChange = (value) => {
		setSearchState(value.target.value)
	}
	const handleEnterPressed = (t) => {
		urlRequestSent(searchState)
	}

	return (
		<StyledContainer>
			<Title>Create shortened url</Title>
			<Search
				placeholder="Please enter url"
				enterButton="Search"
				size="large"
				value={searchState}
				onChange={handleSearchChange}
				onSearch={handleEnterPressed}
				loading={false}
			/>
			{urlRequestData && (
				<UrlContainer>
					Generated url:
					<Paragraph>{`${VITE_BASE_URL}/urlRequest/${urlRequestData}`}</Paragraph>
					<StyledButton
						onClick={() => navigator.clipboard.writeText(`${VITE_BASE_URL}/urlRequest/${urlRequestData}`)}
					>
						Copy text
					</StyledButton>
					<StyledButton onClick={() => setGenerateQRcode(true)}>Generate QRcode</StyledButton>
					{generateQRcode && (
						<div>
							<QRCodeSVG value={`${VITE_BASE_URL}/urlRequest/${urlRequestData}`} />
						</div>
					)}
				</UrlContainer>
			)}
		</StyledContainer>
	)
}

export default Shortener
