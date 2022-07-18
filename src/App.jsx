import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ContactPage from '@/pages/Contact'
import CreatePage from '@/pages/Create'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Layout from '@/Layout'
import LoginPage from '@/pages/LoginPage'
import Main from '@/pages/main'
import NotFound from '@/pages/NotFound'
import SignInPage from '@/pages/SignIn'
import SpinModal from '@/components/SpinAnimation/SpinModal'
import { useCustomContext } from '@/contextProvider'

function App() {
	const { setSpinning, setStopSpinning, isSpinning, currentUser, alertMessage } = useCustomContext()
	const [targetCurrentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		let user = currentUser()
		setCurrentUser(user)
	}, [currentUser])
	console.log('targetCurrentUser', targetCurrentUser)
	return (
		<GoogleOAuthProvider>
			<BrowserRouter>
				<SpinModal isLoading={isSpinning}>
					<Layout>
						<Switch>
							<Route path="/user/login" exact component={LoginPage} />
							<Route path="/user/signIn" exact component={SignInPage} />
							<Route path="/contact" exact component={ContactPage} />
							{targetCurrentUser ? <Route path="/create" exact component={CreatePage} /> : null}
							<Route path="/" exact component={Main} />
							<Route path="*" component={NotFound} />
						</Switch>
					</Layout>
				</SpinModal>
			</BrowserRouter>
		</GoogleOAuthProvider>
	)
}

export default App
