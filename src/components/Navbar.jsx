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

const Navbar = () => {
	const { currentUser, userSignOut } = useCustomContext()
	const [current, setCurrent] = useState('mail')
	const [targetedUser, setCurrentUser] = useState(null)

	const onClick = (e) => {
		console.log('click ', e)
		setCurrent(e.key)
	}

	const renderUser = (user) => {
		if (!user) return
		const {
			result: { username },
		} = user
		console.log('username', username)
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
	const items = [
		{
			label: <Link to="/">TinyURl</Link>,
			key: 'TinyURL',
		},
		{
			label: 'Why us?',
			key: 'brand',
			icon: <MailOutlined />,
		},
		{
			label: 'Features',
			key: 'Features',
		},
		{
			label: 'Contact Us',
			key: 'Contact',
		},
		targetedUser
			? {
					label: renderUser(targetedUser),
					key: 'SignOut',
			  }
			: {
					label: <Link to="/user/signIn">SignIn</Link>,
					key: 'SignIn',
			  },
		targetedUser
			? null
			: {
					label: <Link to="/user/login">SignUp</Link>,
					key: 'SignUp',
			  },
	]

	useEffect(() => {
		let user = currentUser()
		console.log('user', user)
		setCurrentUser(user)
	}, [currentUser])

	return <StyledMenu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}

export default Navbar
