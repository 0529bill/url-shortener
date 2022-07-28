import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut, getElementAtEvent } from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'

import randomColor from 'randomcolor'
import { useCustomContext } from '@/contextProvider'

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
		console.log('chartColor', chartColor)

		const chartData = dataSet.map((t) => t.clicks)
		console.log('chartData', chartData)

		const chartLabel = dataSet.map((t) => t.shortUrl)
		return {
			chartColor,
			chartData,
			chartLabel,
		}
	}

	const renderTargetElement = (targetElementLabel) => {
		const [actualUrl] = urlRespond.filter((t) => t.shortUrl === targetElementLabel)
		console.log('actualUrl', actualUrl)
		return (
			<>
				<div>selectedURl: {targetElementLabel} </div>
				<div>{actualUrl?.fullUrl}</div>
			</>
		)
	}

	console.log('urlRespond', urlRespond)
	useEffect(() => {
		const fetchData = async (username) => {
			const respond = await getUrlByUsername(username)
			console.log('urlRespond', respond)
			const formattedData = handleFormatData(respond)
			console.log('formattedData', formattedData)
			setUrlRespond(respond)
			setUrlByUsernameData(formattedData)
		}
		let user = currentUser()
		if (user?.result?.username !== targetedUser?.result?.username) {
			setCurrentUser(user)
			const username = user?.result?.username
			console.log('username123', username)
			if (username) {
				fetchData(username)
			}
		}
		console.log('user', user)
		console.log('targetedUser', targetedUser)
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
	const renderAnalyticsDetail = () => {
		return (
			<>
				Signed In
				<Doughnut
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
			</>
		)
	}
	return <>{targetedUser ? renderAnalyticsDetail() : <>Sign in to see detailed analytics</>}</>
}

export default Analytics
