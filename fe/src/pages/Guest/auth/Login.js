import { Col, Form, Input, Row, Button } from "antd";
import React from "react";
import "./Auth.scss";
import LayoutAuth from "./LayoutAuth";

const Login = () => {
  return (
    <LayoutAuth>
      <Row
        style={{
          height: "100%",
          padding: "60px 20px",
        }}
      >
        <Col span={24}>
          <Row
            className="text_title "
            style={{
              justifyContent: "center",
              fontSize: 26,
              paddingBottom: 30,
            }}
          >
            Login Now
          </Row>

          <Form>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Row style={{ justifyContent: "center" }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Row>
            </Form.Item>
          </Form>
          <Row>Navigate Register</Row>
        </Col>
      </Row>
    </LayoutAuth>
  );
};

export default Login;
