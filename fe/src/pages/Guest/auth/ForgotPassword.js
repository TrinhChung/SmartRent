import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import LayoutAuth from "./LayoutAuth";
import { useNavigate } from "react-router-dom";

const RequestForgotPassword = () => {
  const navigate = useNavigate();

  const handleFinish = (values) => {
    console.log(values);
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
          <Form layout="vertical" onFinish={handleFinish}>
            <Row
              className="text_title "
              style={{
                justifyContent: "center",
                fontSize: 26,
                paddingBottom: 30,
              }}
            >
              Quên mật khẩu
            </Row>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}
            >
              <Input type="email" placeholder="Nhập email đăng ký tài khoản" />
            </Form.Item>
            <Row>
              <Button htmlType="submit">Gửi yêu cầu</Button>
            </Row>
          </Form>
          <Row style={{ paddingTop: 30 }}>
            <Col>
              <Row>Bạn đã có tài khoản</Row>
              <Row>
                <Col>Đăng nhập</Col>
                <Col
                  className={"navigate-auth"}
                  onClick={() => {
                    navigate("/auth/login");
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

export default RequestForgotPassword;
