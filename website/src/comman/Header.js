import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log("eeeeeee",window.location.pathname)
    const { key } = e;
    if (key == "1") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };
  return (
    <Header className="app-header">
      <div className="logo">ChatApp</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={window.location.pathname == "/login"?["1"]:["2"]}
        className="menu"
      >
        <Menu.Item key="1" onClick={handleClick}>
          Login
        </Menu.Item>
        <Menu.Item key="2" onClick={handleClick}>
          Register
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
