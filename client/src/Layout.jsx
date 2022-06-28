import { Layout as AntdLayout } from 'antd';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import styled from 'styled-components';

const {
  Content: AntdContent,
  Footer: AntdFooter,
  Header: AntdHeader,
} = AntdLayout;

const StyledAntdLayout = styled(AntdLayout)`
  min-height: 100vh;
  font-family: 'Source Code Pro', monospace;
`;

const StyledAntdHeader = styled(AntdHeader)`
  display: flex;
  background: white;
  width: 100%;
`;

const StyledAntdContent = styled(AntdContent)`
  padding: 0 50px;
  background: white;
`;

const StyledAntdFooter = styled(AntdFooter)`
  background: white;
`;

function Layout({ children }) {
  return (
    <StyledAntdLayout>
      <StyledAntdHeader>
        <Link to='/'>TinyURl</Link>
        <Navbar />
      </StyledAntdHeader>
      <StyledAntdContent>{children}</StyledAntdContent>
      <StyledAntdFooter>
        <Footer />
      </StyledAntdFooter>
    </StyledAntdLayout>
  );
}

export default Layout;
