import React, { memo, useContext } from "react";
import { Col, Row, Layout, Avatar, Input, Form, Button } from "antd";
import { AuthContext } from "../../../../providers/authProvider";

const Profile = () => {
  const { authUser } = useContext(AuthContext);

  const connectAccountSc = async () => {
    if (window?.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Col span={24}>
      <Form>
        <Row className="info-basic">
          <Col>
            <label for="input-avatar">
              <Avatar
                shape="square"
                style={{
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                  cursor: "pointer",
                }}
                size={200}
                src={
                  authUser.File
                    ? process.env.REACT_APP_HOST_BE + "/" + authUser.File?.url
                    : null
                }
              >
                {authUser.File ? null : authUser.fullName}
              </Avatar>
            </label>
            <input id="input-avatar" type="file" style={{ display: "none" }} />
          </Col>
          <Col style={{ paddingLeft: 12 }}>
            <Row>name</Row>
            <Row>email</Row>
            <Row>Sdt</Row>
            <Row>Giới tính</Row>
            <Row>
              <Button
                onClick={() => {
                  connectAccountSc();
                }}
              >
                Connect MetaMask
              </Button>
            </Row>
            <Row>Số dư</Row>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default memo(Profile);
