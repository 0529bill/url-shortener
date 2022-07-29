import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut, getElementAtEvent } from 'react-chartjs-2'
import { Table, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'
import randomColor from 'randomcolor'
import styled from 'styled-components'
import { useCustomContext } from '@/contextProvider'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

const { Title } = Typography

const TableContainer = styled.div`
	overflow: scroll;
	margin-bottom: 200px;
`

const ChartContainer = styled.div`
	overflow: scroll;
`

const TargetElementContainer = styled.div`
	margin: 50px 0;
`

ChartJS.register(ArcElement, Tooltip, Legend)
function Analytics() {
	const [targetedUser, setCurrentUser] = useState(null)
	const [urlByUsernameData, setUrlByUsernameData] = useState(null)
	const [targetElementLabel, setTargetElementLabel] = useState(null)
	const [urlRespond, setUrlRespond] = useState(null)
	const [formatData, setFormatData] = useState(null)
	const { currentUser, getUrlByUsername } = useCustomContext()
	const chartRef = useRef(null)

	const handleFormatData = (dataSet) => {
		const dataLength = dataSet.length

		const chartColor = randomColor({
			count: dataLength,
		})

		const chartData = dataSet.map((t) => t.clicks)

		const chartLabel = dataSet.map((t) => t.shortUrl)
		return {
			chartColor,
			chartData,
			chartLabel,
		}
	}

	const renderTargetElement = (targetElementLabel) => {
		const [actualUrl] = urlRespond.filter((t) => t.shortUrl === targetElementLabel)
		return (
			<TargetElementContainer>
				<div>selectedURl: {targetElementLabel} </div>
				<div>{actualUrl?.fullUrl}</div>
			</TargetElementContainer>
		)
	}

	useEffect(() => {
		const fetchData = async (username) => {
			const respond = await getUrlByUsername(username)
			const formattedData = handleFormatData(respond)
			setUrlRespond(respond)
			setUrlByUsernameData(formattedData)
		}
		let user = currentUser()
		if (user?.result?.username !== targetedUser?.result?.username) {
			setCurrentUser(user)
			const username = user?.result?.username
			if (username) {
				fetchData(username)
			}
		}
	}, [currentUser, getUrlByUsername, targetedUser])

	const data = {
		labels: urlByUsernameData?.chartLabel,
		datasets: [
			{
				label: '123123',
				data: urlByUsernameData?.chartData,
				backgroundColor: urlByUsernameData?.chartColor,
				borderColor: urlByUsernameData?.chartColor,
				borderWidth: 2,
			},
		],
	}

	const columns = [
		{
			title: 'fullUrl',
			dataIndex: 'fullUrl',
			key: 'fullUrl',
			render: (text, record) => {
				const fullUrl = record?.fullUrl
				return (
					<a target="_blank" rel="noreferrer" href={record.fullUrl}>
						{fullUrl}
					</a>
				)
			},
		},
		{
			title: 'shortUrl',
			dataIndex: 'shortUrl',
			key: 'shortUrl',
			render: (text, record) => {
				const url = VITE_BASE_URL + '/urlRequest/' + record.shortUrl
				return (
					<a target="_blank" rel="noreferrer" href={url}>
						{url}
					</a>
				)
			},
		},
		{
			title: 'clicks',
			dataIndex: 'clicks',
			key: 'clicks',
		},
	]

	const renderTableData = () => {
		return (
			<TableContainer>
				<Title>All email</Title>
				<Table dataSource={urlRespond} columns={columns} pagination={false} />
			</TableContainer>
		)
	}

	const renderDoughnutChart = () => {
		return (
			<ChartContainer>
				<Title>Email chart</Title>
				<Doughnut
					style={{ margin: '50px 80px' }}
					ref={chartRef}
					onClick={(e) => {
						if (!chartRef.current) return
						const element = getElementAtEvent(chartRef.current, e)
						const elementIndex = element[0]?.index
						setTargetElementLabel(urlByUsernameData?.chartLabel[elementIndex])
					}}
					data={data}
				/>
				{targetElementLabel ? renderTargetElement(targetElementLabel) : null}
			</ChartContainer>
		)
	}

	const renderAnalyticsDetail = () => {
		return (
			<>
				{renderTableData()}
				{renderDoughnutChart()}
			</>
		)
	}
	return <>{targetedUser ? renderAnalyticsDetail() : <>Sign in to see detailed analytics</>}</>
}

export default Analytics
