import React from "react";
import { Row, Col, Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "./ChatList.scss";

const { Sider } = Layout;

const ChatList = ({ chatList = [], switchRoomChat = () => {} }) => {
  const { id } = useParams();

  return (
    <Sider className="chat-list" width={360}>
      <Row className="title-sidebar">Đoạn chat</Row>
      <Row>
        <Col span={24}>
          {chatList.map((roomChat, index) => {
            return (
              <Row
                className={`box-room-chat-list ${
                  String(id) === String(roomChat.id)
                    ? "is-room-chat-selected"
                    : ""
                }`}
                key={`chatlist${index}`}
                onClick={() => {
                  switchRoomChat(roomChat.id);
                }}
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
                  <Row>{roomChat?.name ? roomChat?.name : "RoomChat"}</Row>
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
