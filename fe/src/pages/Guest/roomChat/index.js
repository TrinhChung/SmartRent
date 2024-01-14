import { Col, Row, Layout, Input } from "antd";
import React from "react";
import "./RoomChat.scss";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PaperClipOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Message from "./Message";

const { Header, Footer, Content, Sider } = Layout;

const RoomChat = () => {
  const messages = [
    {
      content: "message 1",
      isOwner: true,
    },
    {
      content: "message 2",
      isOwner: true,
    },
    {
      content: "message 3",
      isOwner: true,
    },
    {
      content: "message 4",
      isOwner: true,
    },
    {
      content: "message 1",
      isOwner: true,
    },
    {
      content: "message 2",
      isOwner: true,
    },
    {
      content: "message 3",
      isOwner: true,
    },
    {
      content: "message 4",
      isOwner: true,
    },
    {
      content: "message 1",
      isOwner: true,
    },
    {
      content: "message 2",
      isOwner: true,
    },
    {
      content: "message 3",
      isOwner: true,
    },
    {
      content: "message 4",
      isOwner: true,
    },
    {
      content: "message 1",
      isOwner: true,
    },
    {
      content: "message 2",
      isOwner: true,
    },
    {
      content: "message 3",
      isOwner: true,
    },
    {
      content: "message 4",
      isOwner: true,
    },
    {
      content: "message 1",
      isOwner: true,
    },
    {
      content: "message 2",
      isOwner: true,
    },
    {
      content: "message 3",
      isOwner: true,
    },
    {
      content: "message 4",
      isOwner: true,
    },
    {
      content: "message 1",
      isOwner: true,
    },
    {
      content: "message 2",
      isOwner: true,
    },
    {
      content: "message 3",
      isOwner: true,
    },
    {
      content: "message 4",
      isOwner: true,
    },
    {
      content: "message 1",
      isOwner: true,
    },
    {
      content: "message 2",
      isOwner: true,
    },
    {
      content: "message 3",
      isOwner: true,
    },
    {
      content: "message 4",
      isOwner: true,
    },
    {
      content: "message 1",
      isOwner: true,
    },
    {
      content: "message 2",
      isOwner: true,
    },
    {
      content: "message 3",
      isOwner: true,
    },
    {
      content: "message 4",
      isOwner: true,
    },
  ];
  return (
    <Layout className="room-chat">
      <Sider className="list-chat" width={360}>
        <Row className="text-bold-18" style={{ padding: "20px 20px" }}>
          Đoạn chat
        </Row>
      </Sider>
      <Layout className="content-room-chat">
        <Row className="menu-room-chat">
          <Col className="text-bold-18 ">Name</Col>
          <Col>
            <Row gutter={[16]}>
              <Col className="text-bold-18 wrap-icon" style={{ color: "red" }}>
                <DeleteOutlined />
              </Col>
              <Col className="text-bold-18 wrap-icon">
                <EditOutlined />
              </Col>
              <Col className="text-bold-18 wrap-icon">
                <InfoCircleOutlined spin />
              </Col>
            </Row>
          </Col>
        </Row>
        <Content className="box-message">
          <Col
            style={{ paddingTop: 20, height: "100%", overflow: "auto" }}
            span={24}
          >
            {messages.map((message) => {
              return <Message message={message} />;
            })}
          </Col>
        </Content>
        <Footer className="input-message">
          <Col span={24}>
            <Row className="wrap-input-message">
              <Col xxl={1}>
                <Row
                  className="icon-input"
                  style={{ justifyContent: "center" }}
                >
                  <PaperClipOutlined />
                </Row>
              </Col>
              <Col xxl={22}>
                <Input />
              </Col>
              <Col xxl={1}>
                <Row
                  className="icon-input"
                  style={{ justifyContent: "center" }}
                >
                  <SendOutlined />
                </Row>
              </Col>
            </Row>
          </Col>
        </Footer>
      </Layout>
      <Sider className="list-chat" width={360}>
        Sidebar
      </Sider>
    </Layout>
  );
};

export default RoomChat;
