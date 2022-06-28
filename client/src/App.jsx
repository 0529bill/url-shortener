import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '@/Layout';
import LoginPage from '@/pages/LoginPage';
import Main from '@/pages/main';
import NotFound from '@/pages/NotFound';
import SignUpPage from '@/pages/SignUp';
import SpinModal from '@/components/shared/SpinAnimation/SpinModal';
import { useCustomContext } from '@/contextProvider';

function App() {
  console.log('useCustomContext', useCustomContext);
  const { setSpinning, setStopSpinning, isSpinning } = useCustomContext();

  return (
    <GoogleOAuthProvider>
      <BrowserRouter>
        <SpinModal isLoading={isSpinning}>
          <Layout>
            <Switch>
              <Route path='/user/login' exact component={LoginPage} />
              <Route path='/user/signup' exact component={SignUpPage} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/' exact component={Main} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Layout>
        </SpinModal>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
