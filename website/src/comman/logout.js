import React from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "../utils/Toast"

function Logout() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("email")
    ToastContainer(true,"Logout successfully!!")
    navigate("/")
  }
    const userMenu = (
        <Menu>
          <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
            Log out
          </Menu.Item>
        </Menu>
      );
  return (
    <Dropdown overlay={userMenu} placement="bottomRight">
    <Avatar icon={<UserOutlined />} className="avatar" />
  </Dropdown>
 )
}

export default Logout
