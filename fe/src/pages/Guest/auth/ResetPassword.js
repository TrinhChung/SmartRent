import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import LayoutAuth from "./LayoutAuth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordService } from "../../../services/User";

const ResetPassword = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      const data = { token: uuid, ...values };
      const res = await resetPasswordService(data);
      if (res.status === 200) {
        toast.success("Thay đổi mật khẩu thành công");
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error(error.message);
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
              label="Mật khẩu mới"
              className="input-profile"
              name="password"
              dependencies={["oldPassword"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu mới",
                },
              ]}
            >
              <Input type="password" placeholder="Nhập mật khẩu mới" />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
              className="input-profile"
              name="rePassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Nhập lại password vào!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Password không giống Nhập lại!")
                    );
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>
            <Row>
              <Button htmlType="submit">Thay đổi mật khẩu</Button>
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

export default ResetPassword;
