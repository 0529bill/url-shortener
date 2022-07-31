import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Analytics from '@/pages/Analytics'
import ContactPage from '@/pages/Contact'
import CreatePage from '@/pages/Create'
import ForgetPassword from '@/pages/ForgetPassword'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Layout from '@/Layout'
import LoginPage from '@/pages/LoginPage'
import Main from '@/pages/main'
import NotFound from '@/pages/NotFound'
import ResetPassword from '@/pages/ResetPassword'
import SignInPage from '@/pages/SignIn'
import SpinModal from '@/components/SpinAnimation/SpinModal'
import { useCustomContext } from '@/contextProvider'

function App() {
	const { isSpinning, currentUser } = useCustomContext()
	const [targetCurrentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		let user = currentUser()
		setCurrentUser(user)
	}, [currentUser])
	return (
		<GoogleOAuthProvider>
			<BrowserRouter>
				<SpinModal isLoading={isSpinning}>
					<Layout>
						<Switch>
							<Route path="/user/login" exact component={LoginPage} />
							<Route path="/user/signIn" exact component={SignInPage} />
							<Route path="/user/forgetPassword/" exact component={ForgetPassword} />
							<Route path="/user/resetPassword/:username" exact component={ResetPassword} />
							<Route path="/contact" exact component={ContactPage} />
							<Route path="/analytics" exact component={Analytics} />
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
