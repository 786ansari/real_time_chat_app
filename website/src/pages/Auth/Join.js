import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import AppHeader from "../../comman/Header";
import { useNavigate } from "react-router-dom";
import { api_path } from "../../services/api.routes";
import { PostService } from "../../services/post.service";
import { ToastContainer } from "../../utils/Toast";
import { profileContext } from "../../context/Profile.context"

const Join = () => {
  const [loading, setLoading] = useState(false);
  const {getProfile} = useContext(profileContext);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    const response = await PostService(api_path.login, values);
    console.log(response)
    ToastContainer(response?.status, response?.message);
    setLoading(false);
    if (response?.status) {
      getProfile(values);
      navigate("/chat"); // Navigate to login page on success
    }
  };

  return (
    <>
      <AppHeader />
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <h4>Please Login To Join Chat</h4>
          <Form
            name="join_form"
            className="join-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Email is not valid!" },
            ]}
          >
            <Input placeholder="Email" prefix={<MailOutlined/>} />
          </Form.Item>
          <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your Password!" },
          { min: 6, message: "Password must be at least 6 characters long!" },
          { max: 20, message: "Password cannot exceed 20 characters!" }
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="join-form-button"
                block
              >
                Join Chat
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Join;
