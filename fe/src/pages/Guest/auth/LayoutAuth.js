import React from "react";
import { Col, Row, Spin } from "antd";
import "./Auth.scss";

const LayoutAuth = ({ children, loading = false }) => {
  return (
    <Col span={24} className="login">
      <Spin spinning={loading}>
        <Row style={{ paddingBottom: 56, justifyContent: "center" }}>
          <Col
            xs={24}
            xxl={8}
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Row className="background-banner-container">
              <Col span={24} className="background-banner-image" />
            </Row>
            <Row className="image-banner-login" />
          </Col>
          <Col xxl={6} className="form-auth">
            {children}
          </Col>
        </Row>
      </Spin>
    </Col>
  );
};

export default LayoutAuth;
