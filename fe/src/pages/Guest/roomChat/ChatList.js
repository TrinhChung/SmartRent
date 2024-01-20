import React from "react";
import { Row, Col, Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ChatList.scss";

const { Sider } = Layout;

const ChatList = ({ chatList = [] }) => {
  const roomChatId = 1;

  return (
    <Sider className="chat-list" width={360}>
      <Row className="title-sidebar">Đoạn chat</Row>
      <Row>
        <Col span={24}>
          {chatList.map((roomChat) => {
            return (
              <Row
                className={`box-room-chat-list ${
                  roomChatId === roomChat.id ? "is-room-chat-selected" : ""
                }`}
              >
                <Col>
                  <Avatar size={56} icon={<UserOutlined />} />
                </Col>
                <Col
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: 4,
                  }}
                >
                  <Row>{roomChat?.name}</Row>
                  <Row>{roomChat?.lastMessage?.content}</Row>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {roomChat?.lastMessage?.time}
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Sider>
  );
};

export default ChatList;
