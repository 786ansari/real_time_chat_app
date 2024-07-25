import React, { useState } from "react";
import { Form, Input, Button, Alert, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { api_path } from "../../services/api.routes";
import { PostService } from "../../services/post.service";
import { ToastContainer } from "../../utils/Toast";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import AppHeader from "../../comman/Header";

const { Title } = Typography;

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await PostService(api_path.register, values);
    console.log(response);
    ToastContainer(response?.status, response?.message);
    setLoading(false);
    if (response?.status) {
      navigate("/"); // Navigate to login page on success
    }
  };

  return (
    <>
    <AppHeader/>
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Col xs={24} sm={18} md={12} lg={8}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>Register</Title>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Name" prefix={<UserOutlined/>} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Email is not valid!" },
            ]}
          >
            <Input placeholder="Email" prefix={<MailOutlined/>} />
          </Form.Item>
          <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Please input your Password!" },
          { min: 6, message: "Password must be at least 6 characters long!" },
          { max: 20, message: "Password cannot exceed 20 characters!" }
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </>
  );
};

export default RegistrationForm;
