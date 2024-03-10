import React from "react";
import { Row, Col, Layout, Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { statusRent } from "../../../const/index";
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
                  <Avatar
                    size={56}
                    src={
                      roomChat?.contract?.RealEstate?.realEstateFiles.length > 0
                        ? process.env.REACT_APP_HOST_BE +
                          "/" +
                          roomChat?.contract?.RealEstate?.realEstateFiles[0].url
                        : undefined
                    }
                  >
                    {roomChat?.contract?.RealEstate?.realEstateFiles.length >
                    0 ? null : (
                      <UserOutlined />
                    )}
                  </Avatar>
                </Col>
                <Col
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: 4,
                  }}
                >
                  <Row>
                    {roomChat?.name
                      ? roomChat?.name.length > 60
                        ? roomChat?.name.substring(0, 60) + "..."
                        : roomChat.name
                      : "RoomChat"}
                  </Row>
                  <Row className="text-shadow" style={{ paddingTop: 4 }}>
                    <Badge
                      status="processing"
                      color={
                        roomChat?.contract?.status
                          ? statusRent[roomChat?.contract?.status].color
                          : "black"
                      }
                      text={<label className="text-shadow">Trạng thái:</label>}
                    />
                    <div style={{ paddingLeft: 8 }}>
                      {roomChat?.contract?.status
                        ? statusRent[roomChat?.contract?.status].value
                        : "Không tồn tại"}
                    </div>
                  </Row>
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
