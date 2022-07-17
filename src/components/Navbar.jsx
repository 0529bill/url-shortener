import { Button, Menu } from "antd";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useCustomContext } from "@/contextProvider";
import { useEffect } from "react";
import { useState } from "react";

const StyledMenu = styled(Menu)`
  border-bottom: none;
  font-size: 1.3rem;
  padding: 30px;
`;

const renderUser = () => {
  return <span style={{ marginLeft: "auto" }}>user</span>;
};

const items = [
  {
    label: <Link to="/">TinyURl</Link>,
    key: "TinyURL",
  },
  {
    label: "Why us?",
    key: "brand",
    icon: <MailOutlined />,
  },
  {
    label: "Features",
    key: "Features",
  },
  {
    label: "Contact Us",
    key: "Contact",
  },
  {
    label: <Link to="/user/login">SignUp</Link>,
    key: "SignIn",
  },
  {
    label: <Link to="/user/signIn">SignIn</Link>,
    key: "SignIn",
  },
  {
    // label: <Link to="/user/signIn">SignIn</Link>,
    label: renderUser(),
    key: "SignIn",
  },
];

const Navbar = () => {
  const { currentUser } = useCustomContext();
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const ellipsisIcon = (
    <Button
      size="large"
      icon={<MenuOutlined />}
      className="nav-responsive-btn"
    ></Button>
  );

  useEffect(() => {
    let a = currentUser();
    console.log("a", a);
  }, []);

  return (
    <StyledMenu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
