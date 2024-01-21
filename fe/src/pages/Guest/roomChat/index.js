import { Col, Row, Layout, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./RoomChat.scss";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PaperClipOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Message from "./Message";
import ChatList from "./ChatList";
import ChatInfo from "./ChatInfo";
import { SocketContext } from "../../../providers/socketProvider";
import { getRoomChatForMeService } from "../../../services/RoomChat";
import { useNavigate, useParams } from "react-router-dom";

const { Footer, Content } = Layout;

const RoomChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [roomChats, setRoomChats] = useState([]);
  const messages = [
    {
      content: `Hi, this is Bing. I can help you with creating a messenger codepen layout. 😊
A codepen layout is a web page that you can create and edit online using HTML, CSS, and JavaScript. You can use codepen to showcase your web projects, experiment with new ideas, or learn from other developers.`,
      isOwner: true,
    },
    {
      content: `Hi, this is Bing. I can help you with creating a messenger codepen layout. 😊
A codepen layout is a web page that you can create and edit online using HTML, CSS, and JavaScript. You can use codepen to showcase your web projects, experiment with new ideas, or learn from other developers`,
      isOwner: false,
    },
    {
      content: "message 3",
      isOwner: false,
    },
    {
      content: "message 4",
      isOwner: true,
    },
  ];

  const getRoomChatForMe = async () => {
    try {
      const res = await getRoomChatForMeService();
      if (res.status === 200) {
        setRoomChats(res.data);
        if (res.data.length > 0) {
          navigate(`/room-chat/${res.data[0].id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomChatForMe();
  }, []);

  return (
    <Layout className="room-chat">
      <ChatList chatList={roomChats} />
      <Layout className="content-room-chat">
        <Row className="msg-header">
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
        <Content className="msg-body">
          {messages.map((message, index) => {
            return <Message message={message} key={`chat${index}`} />;
          })}
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
                  <SendOutlined
                    onClick={() => {
                      console.log(socket.connected);
                    }}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Footer>
      </Layout>
      <ChatInfo />
    </Layout>
  );
};

export default RoomChat;
