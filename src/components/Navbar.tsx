import { Button, Menu } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { MailOutlined, SettingOutlined } from '@ant-design/icons'

import { MenuInfo } from 'rc-menu/lib/interface'
import { MenuOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useCustomContext } from '@/contextProvider'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const StyledMenu = styled(Menu)`
	border-bottom: none;
	font-size: 1.3rem;
	padding: 30px;
`

function Navbar() {
	const location = useLocation()
	const history = useHistory()
	const { currentUser, userSignOut } = useCustomContext()
	const [current, setCurrent] = useState('TinyURL')
	const [targetedUser, setCurrentUser] = useState(null)
	const handleMenuClick = (e: MenuInfo) => {
		setCurrent(e.key)
	}

	const handleSelectedKeys = () => {
		const navKey = ['create', 'signOut', 'contact', 'user/signIn', 'user/login', '', 'analytics']
		const currentPath = location?.pathname.slice(1)
		if (navKey.includes(currentPath)) {
			if (currentPath === '') {
				return 'TinyURL'
			} else if (currentPath === 'user/signIn') {
				return 'signIn'
			} else if (currentPath === 'user/login') {
				return 'signUp'
			}
			return currentPath
		}
		return ''
	}

	const renderUser = (user) => {
		if (!user) return
		const {
			result: { username },
		} = user
		return (
			username && (
				<span
					onClick={() => {
						userSignOut()
						setCurrentUser(null)
						history.push('/')
					}}
					style={{ marginLeft: 'auto' }}
				>{`sign out`}</span>
			)
		)
	}

	const logInItems = targetedUser
		? [
				{
					label: <Link to="/create">Create</Link>,
					key: 'create',
				},
				{
					label: renderUser(targetedUser),
					key: 'signOut',
				},
		  ]
		: [
				{
					label: <Link to="/contact">Contact Us</Link>,
					key: 'contact',
				},
				{
					label: <Link to="/user/signIn">SignIn</Link>,
					key: 'signIn',
				},
				{
					label: <Link to="/user/login">SignUp</Link>,
					key: 'signUp',
				},
		  ]

	const items = [
		{
			label: <Link to="/">TinyURl</Link>,
			key: 'TinyURL',
		},
		{
			label: <Link to="/analytics">Analytics</Link>,
			key: 'Analytics',
		},
		...logInItems,
	]

	useEffect(() => {
		let user = currentUser()
		setCurrentUser(user)
	}, [currentUser])

	return (
		<StyledMenu onClick={handleMenuClick} selectedKeys={[handleSelectedKeys()]} mode="horizontal" items={items} />
	)
}

export default Navbar
