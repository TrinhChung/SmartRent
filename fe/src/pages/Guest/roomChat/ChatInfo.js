import React from "react";
import { ContainerOutlined } from "@ant-design/icons";
import { Layout, Row, Col } from "antd";
import "./ChatList.scss";

const { Sider } = Layout;

const ChatInfo = ({}) => {
  return (
    <Sider className="chat-info" width={360}>
      <Row className="title-sidebar">Sidebar</Row>
      <Row className="box-chat-info">
        <Col>
          <ContainerOutlined />
        </Col>
        <Col>Hợp đồng</Col>
      </Row>
    </Sider>
  );
};

export default ChatInfo;
