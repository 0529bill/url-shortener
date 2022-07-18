import * as api from '@/api/index'

import { createContext, useContext, useState } from 'react'

import AlertModal from '@/components/AlertModal'
import { RTNCODES } from '@/constants'
import decode from 'jwt-decode'

const ContextApi = createContext()

export function useCustomContext() {
	return useContext(ContextApi)
}

export const ContextApiProvider = ({ children }) => {
	const [urlRequestData, setUrlRequestData] = useState(null)
	const [isSpinning, setIsSpinning] = useState(false)

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
		setSpinning()
		try {
			const infoData = await api.createUser(userInfo)
			console.log('infoData', infoData)
			setStopSpinning()
			setAlert({ type: 'success', content: 'User created!' })
			setPassedResult(null)
			return history.push('/user/signIn')
		} catch (error) {
			console.log('createUser_error', error)
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

	const userSignIn = async ({ userInfo, setPassedResult }) => {
		setSpinning()
		try {
			let signInResult = await api.userSignIn(userInfo)
			localStorage.setItem('userProfile', JSON.stringify({ ...signInResult?.data }))
			setAlert({ type: 'success', content: 'User signed In!' })
			setStopSpinning()
		} catch (error) {
			console.log('userSignIn_error', error)
			if (error?.headers?.rtn === RTNCODES.RtnCodes.UserNotFound) {
				setStopSpinning()
				setAlert({ type: 'error', content: 'User not found!' })
				return setPassedResult({ msg: 'User not found!' })
			}
			setStopSpinning()
			setAlert({ type: 'error', content: 'Failed to sign in!' })
			return setPassedResult({ msg: 'Failed to sign in!' })
		}
	}

	const currentUser = () => {
		let userData = JSON.parse(localStorage.getItem('userProfile'))
		if (userData) {
			console.log('userData', userData)
			let token = userData?.token
			console.log('token', token)

			const decodedToken = decode(token)
			if (decodedToken.exp * 1000 > new Date().getTime()) {
				return userData
			}
		}
		return null
	}

	const userSignOut = () => {
		localStorage.clear()
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
		userSignOut,
	}

	return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>
}
