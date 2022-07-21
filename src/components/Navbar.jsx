import { Button, Menu } from 'antd'
import { MailOutlined, SettingOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useCustomContext } from '@/contextProvider'
import { useEffect } from 'react'
import { useState } from 'react'

const StyledMenu = styled(Menu)`
	border-bottom: none;
	font-size: 1.3rem;
	padding: 30px;
`

function Navbar() {
	const { currentUser, userSignOut } = useCustomContext()
	const [current, setCurrent] = useState('TinyURL')
	const [targetedUser, setCurrentUser] = useState(null)

	const handleMenuClick = (e) => {
		setCurrent(e.key)
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
					key: 'Create',
				},
				{
					label: renderUser(targetedUser),
					key: 'SignOut',
				},
		  ]
		: [
				{
					label: <Link to="/user/signIn">SignIn</Link>,
					key: 'SignIn',
				},
				{
					label: <Link to="/user/login">SignUp</Link>,
					key: 'SignUp',
				},
		  ]

	const items = [
		{
			label: <Link to="/">TinyURl</Link>,
			key: 'TinyURL',
		},
		{
			label: <Link to="/contact">Contact Us</Link>,
			key: 'Contact',
		},
		...logInItems,
	]

	useEffect(() => {
		let user = currentUser()
		console.log('user', user)
		setCurrentUser(user)
	}, [currentUser])

	return <StyledMenu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal" items={items} />
}

export default Navbar
