import * as api from '@/api/index'

import { createContext, useContext, useState } from 'react'

import AlertModal from '@/components/AlertModal'
import { RTNCODES } from '@/constants'
import decode from 'jwt-decode'
import { useEffect } from 'react'

console.log('RTNCODES', RTNCODES)
const ContextApi = createContext()

export function useCustomContext() {
	return useContext(ContextApi)
}

export const ContextApiProvider = ({ children }) => {
	const [urlRequestData, setUrlRequestData] = useState(null)
	const [isSpinning, setIsSpinning] = useState(false)
	const [userInfo, setUserInfo] = useState(null)

	const urlRequestSent = async (inputValue) => {
		setSpinning()
		try {
			const urlData = await api.sentUrlRequest(inputValue)
			setUrlRequestData(urlData.data.shortenedUrl)
			setStopSpinning()
		} catch (error) {
			setStopSpinning()
			return false
		}
		return true
	}

	const getUrlRespond = () => {
		setSpinning()
		if (urlRequestData) {
			setStopSpinning()
			return urlRequestData
		}
		setStopSpinning()
		return false
	}

	const setSpinning = () => setIsSpinning(true)

	const setStopSpinning = () => setIsSpinning(false)

	const setAlert = (alertProps) => {
		return AlertModal(alertProps)
	}

	const createUser = async ({ userInfo, setPassedResult, history }) => {
		console.log('userInfo', userInfo)
		console.log('localStorage', localStorage)
		setSpinning()
		try {
			const infoData = await api.createUser(userInfo)
			console.log('infoData', infoData)
			// { message: "success", result, token }
			setStopSpinning()
			setAlert({ type: 'success', content: 'User created!' })
			setPassedResult(null)
			// localStorage.setItem(
			//   "userProfile",
			//   JSON.stringify({ ...infoData?.data })
			// );
			return history.push('/user/signIn')
		} catch (error) {
			console.log('createUser_error', error)
			console.log('RTNCODES', RTNCODES)
			if (error?.headers?.rtn === RTNCODES.RtnCodes.DuplicateUser) {
				setStopSpinning()

				setAlert({ type: 'error', content: 'Duplicated user' })
				return setPassedResult({ msg: 'Duplicated user' })
			}
			setStopSpinning()
			setAlert({ type: 'error', content: 'Failed to create User' })
			return setPassedResult({ msg: 'Failed to create User' })
		}
	}

	const userSignIn = async (userInfo) => {
		try {
			let signInResult = await api.userSignIn(userInfo)
			console.log('signInResult', signInResult)
		} catch (error) {
			console.log('userSignIn_error', error)
		}
	}

	const currentUser = () => {
		let userData = JSON.parse(localStorage.getItem('userProfile'))
		console.log('userData', userData)
		let token = userData?.token
		console.log('token', token)
		if (token) {
			const decodedToken = decode(token)
			console.log('decodedToken', decodedToken)
			return true
		}
		return false
	}
	const value = {
		setSpinning,
		setStopSpinning,
		isSpinning,
		setAlert,
		urlRequestData,
		urlRequestSent,
		getUrlRespond,
		createUser,
		userSignIn,
		currentUser,
	}

	return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>
}
