import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "@/Layout";
import LoginPage from "@/pages/LoginPage";
import Main from "@/pages/main";
import NotFound from "@/pages/NotFound";
import SignInPage from "@/pages/SignIn";
import SpinModal from "@/components/SpinAnimation/SpinModal";
import { useCustomContext } from "@/contextProvider";

function App() {
  const { setSpinning, setStopSpinning, isSpinning, alertMessage } =
    useCustomContext();
  return (
    <GoogleOAuthProvider>
      <BrowserRouter>
        <SpinModal isLoading={isSpinning}>
          <Layout>
            <Switch>
              <Route path="/user/login" exact component={LoginPage} />
              <Route path="/user/signIn" exact component={SignInPage} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/" exact component={Main} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Layout>
        </SpinModal>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
