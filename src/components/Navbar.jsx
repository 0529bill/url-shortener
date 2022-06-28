import { Button, Menu } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState } from 'react';

const StyledMenu = styled(Menu)`
  border-bottom: none;
`;
const items = [
  {
    label: 'Why TinyURl',
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
  {
    label: <Link to='/user/login'>login</Link>,
    key: 'SignIn',
  },
  {
    label: <Link to='/user/signup'>SignIn</Link>,
    key: 'SignIn',
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const ellipsisIcon = (
    <Button
      size='large'
      icon={<MenuOutlined />}
      //   onClick={handleToggle}
      className='nav-responsive-btn'
    ></Button>
  );

  return (
    <StyledMenu
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
      //   inlineCollapsed={false}
      //   overflowedIndicator={ellipsisIcon}
    />
  );
};

export default Navbar;
