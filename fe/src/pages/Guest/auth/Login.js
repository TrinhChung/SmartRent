import { Col, Form, Input, Row, Button } from "antd";
import React from "react";
import "./Auth.scss";
import LayoutAuth from "./LayoutAuth";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { loginService } from "../../../services/Auth";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await loginService(values);
      if (res.status === 200) {
        toast.success("Login successfully completed");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

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

          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
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
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Row style={{ justifyContent: "center" }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Row>
            </Form.Item>
          </Form>
          <Row>
            <Col>
              <Row>Bạn chưa có tài khoản</Row>
              <Row>
                <Col>Đăng ký</Col>
                <Col
                  className={"navigate-auth"}
                  onClick={() => {
                    navigate("/auth/signup");
                  }}
                >
                  Tại đây
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </LayoutAuth>
  );
};

export default Login;
