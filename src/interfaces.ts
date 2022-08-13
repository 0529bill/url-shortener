import { RouteComponentProps } from 'react-router-dom'

export type UserProps = {
	userInfo: { username: string; password: string }
	setPassedResult: React.Dispatch<React.SetStateAction<null | { msg: string }>>
	history: RouteComponentProps['history']
}

export interface ContextProps {
	setSpinning: () => void
	setStopSpinning: () => void
	isSpinning: boolean
	setAlert: any
	urlRequestData: null | string
	urlRequestSent: ({ searchState, username }: { searchState: string; username: string }) => Promise<boolean>
	getUrlByUsername: (userInfo: string) => Promise<UserRespond[] | null>
	getUrlRespond: () => boolean | string
	createUser: ({ userInfo, setPassedResult, history }: UserProps) => Promise<void>
	userSignIn: ({ userInfo, setPassedResult, history }: UserProps) => Promise<void>
	currentUser: () => null | any
	userSignOut: () => void
}

export interface UserInfo {
	result: {
		email: string
		password: string
		username: string
		__v: number
		_id: string
	}
	token: string
}

export interface UserRespond {
	clicks: number
	fullUrl: string
	shortUrl: string
	username: string
	__v: number
	_id: string
}
