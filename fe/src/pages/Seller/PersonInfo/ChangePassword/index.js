import React, { useCallback } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { changePasswordService } from "../../../../services/User";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const fetchChangePassword = useCallback(
    async (data) => {
      try {
        const res = await changePasswordService(data);
        if (res.status === 200) {
          toast.success("Thay đổi mật khẩu thành công");
        }
      } catch (error) {
        alert(error.message);
      }
    },
    [form]
  );

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={() => {
        fetchChangePassword(form.getFieldsValue());
      }}
    >
      <Row className="text_title">Thay đổi mật khẩu</Row>
      <Col span={9}>
        <Form.Item
          label="Mật khẩu cũ"
          className="input-profile"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu cũ",
            },
          ]}
        >
          <Input type="password" placeholder="Nhập mật khẩu cũ" />
        </Form.Item>
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && getFieldValue("oldPassword") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới phải khác với mật khẩu cũ!")
                );
              },
            }),
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
      </Col>
      <Row>
        <Button className="button-border" htmlType="submit">
          Thay đổi mật khẩu
        </Button>
      </Row>
    </Form>
  );
};

export default ChangePassword;
