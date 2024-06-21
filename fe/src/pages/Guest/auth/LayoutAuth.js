import React from "react";
import { Col, Row, Spin } from "antd";
import "./Auth.scss";

const LayoutAuth = ({
  children,
  loading = false,
  contentLoading = "...Loading",
}) => {
  const height = "543px";
  const width = "500px";

  return (
    <Col span={24} className="login">
      <Spin spinning={loading} tip={contentLoading}>
        <Row style={{ paddingBottom: 56, justifyContent: "center" }}>
          <Col
            xs={8}
            xxl={8}
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Row
              className="background-banner-container"
              style={{ height: height, width: width }}
            >
              <Col span={24} className="background-banner-image" />
            </Row>
            <Row className="image-banner-login" style={{ height: height }} />
          </Col>
          <Col xxl={6} className="form-auth" style={{ minWidth: 400 }}>
            {children}
          </Col>
        </Row>
      </Spin>
    </Col>
  );
};

export default LayoutAuth;
