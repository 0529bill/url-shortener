import { Button, Checkbox, Form } from 'antd';
import { Divider, Typography } from 'antd';

import AntdButton from '@/components/shared/AntdButton';
import AntdInput from '@/components/shared/AntdInput';
import Container from '@/components/style/Container';
import { Link } from 'react-router-dom';
// import SpinIcon from '@/components/shared/SpinAnimation/SpinIcon';
import styled from 'styled-components';
import { useState } from 'react';
import utils from '@/utils';

const { Title, Paragraph, Text } = Typography;
const { handleValidation, errorMessageHandler } = utils;
const StyledContainer = styled(Container)`
  flex-direction: column;
  padding: 50px;
`;

function loginPage() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState({
    username: null,
    password: null,
  });
  const handleSubmit = () => {
    console.log('handleSubmit');
    const loginValidation = [
      {
        index: 'username',
        condition: [!username],
      },
      {
        index: 'password',
        condition: [!password],
      },
    ];

    const [isPass, loginValidationError] = handleValidation({
      errorArray: loginValidation,
      defaultErrorMessage: "input can't be blank",
    });

    setLoginError(loginValidationError);
  };
  return (
    <>
      <StyledContainer>
        <Title>Log in and start Sharing</Title>
        Don't have an account? <Link to='/user/signup'>Sign up.</Link>
        Log in with:
        <Divider>OR</Divider>
        <AntdInput
          isError={errorMessageHandler('error', loginError.username)}
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
          text={() => <div>Email address or username</div>}
        />
        <AntdInput
          isError={errorMessageHandler('error', loginError.password)}
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          text={() => <div>Password</div>}
        />
        Forgot your password?
        <AntdButton onClick={handleSubmit}>Log in</AntdButton>
        By signing in with an account, you agree to Bitly's Terms of Service,
        Privacy Policy and Acceptable Use Policy.
      </StyledContainer>
    </>
  );
}

export default loginPage;
