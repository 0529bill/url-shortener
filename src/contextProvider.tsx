import * as React from 'react'
import * as api from '@/api/index'

import { ContextProps, UserInfo, UserProps, UserRespond } from '@/interfaces'
import decode, { JwtPayload } from 'jwt-decode'

import AlertModal from '@/components/AlertModal'
import { AxiosResponse } from 'axios'
import { RTNCODES } from '@/constants'

// import React, { createContext, useContext, useState } from 'react'

const { createContext, useContext, useState } = React
const ContextApi = createContext<ContextProps>({
	setSpinning: () => null,
	setStopSpinning: () => null,
	isSpinning: false,
	setAlert: '',
	urlRequestData: '',
	urlRequestSent: async () => false,
	getUrlByUsername: async () => null,
	getUrlRespond: () => false,
	createUser: async () => {},
	userSignIn: async () => {},
	currentUser: () => null,
	userSignOut: () => null,
})

export function useCustomContext() {
	return useContext(ContextApi)
}
interface Props {
	children: React.ReactNode
}

export const ContextApiProvider = ({ children }: Props) => {
	const [urlRequestData, setUrlRequestData] = useState(null)
	const [isSpinning, setIsSpinning] = useState(false)
	const [urlByUsernameData, setUrlByUsernameData] = useState<UserRespond[] | null>()

	const setSpinning = () => setIsSpinning(true)

	const urlRequestSent = async ({ searchState, username }: { searchState: string; username: string }) => {
		setSpinning()
		try {
			const urlData = await api.sentUrlRequest({ urlRequest: searchState, username })

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

	const setStopSpinning = () => setIsSpinning(false)

	const setAlert = (alertProps: { type: string; content: string }) => {
		return AlertModal(alertProps)
	}

	const createUser = async ({ userInfo, setPassedResult, history }: UserProps) => {
		setSpinning()
		try {
			const infoData = await api.createUser(userInfo)
			setStopSpinning()
			setAlert({ type: 'success', content: 'User created!' })
			setPassedResult(null)
			history.push('/user/signIn')
			return
		} catch (error) {
			if (error?.headers?.rtn === RTNCODES.RtnCodes.DuplicateUser) {
				setStopSpinning()

				setAlert({ type: 'error', content: 'Duplicated user' })
				setPassedResult({ msg: 'Duplicated user' })
				return
			}
			setStopSpinning()
			setAlert({ type: 'error', content: 'Failed to create User' })
			setPassedResult({ msg: 'Failed to create User' })
			return
		}
	}

	const userSignIn = async ({ userInfo, setPassedResult, history }: UserProps) => {
		setSpinning()
		try {
			let signInResult: AxiosResponse = await api.userSignIn(userInfo)
			console.log('signInResult', signInResult)
			localStorage.setItem('userProfile', JSON.stringify({ ...signInResult?.data }))
			setAlert({ type: 'success', content: 'User signed In!' })
			setStopSpinning()
			history.push('/create')
			return
		} catch (error) {
			if (error?.headers?.rtn === RTNCODES.RtnCodes.UserNotFound) {
				setStopSpinning()
				setAlert({ type: 'error', content: 'User not found!' })
				setPassedResult({ msg: 'User not found!' })
				return
			}
			setStopSpinning()
			setAlert({ type: 'error', content: 'Failed to sign in!' })
			setPassedResult({ msg: 'Failed to sign in!' })
			return
		}
	}

	const currentUser = () => {
		let userData: UserInfo = JSON.parse(localStorage.getItem('userProfile') || 'false')
		console.log('userData', userData)
		if (userData) {
			let token = userData?.token
			const decodedToken = decode<JwtPayload>(token)
			if (decodedToken?.exp && decodedToken.exp * 1000 > new Date().getTime()) {
				return userData
			}
		}
		return null
	}

	const userSignOut = () => {
		localStorage.clear()
		return
	}

	const getUrlByUsername = async (userInfo: string): Promise<UserRespond[] | null> => {
		if (!userInfo) return null
		try {
			const respond = await api.getUrlByUsername(userInfo)
			console.log('respond', respond)
			const respondData: UserRespond[] = respond?.data?.url
			if (respondData) {
				console.log('respondData', respondData)
				setUrlByUsernameData(respondData)
				return respondData
			} else {
				return null
			}
		} catch (error) {
			return null
		}
	}

	const value = {
		setSpinning,
		setStopSpinning,
		isSpinning,
		setAlert,
		urlRequestData,
		urlRequestSent,
		getUrlByUsername,
		getUrlRespond,
		createUser,
		userSignIn,
		currentUser,
		userSignOut,
	}

	return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>
}
