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
import {
  getMessagesOfRoomChatService,
  sendMessageToRoomService,
} from "../../../services/RoomChat";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../providers/authProvider";

const { Footer, Content } = Layout;
const { TextArea } = Input;

const RoomChat = () => {
  const { authUser } = useContext(AuthContext);
  const { id } = useParams();
  const { socket, roomChats } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const sendMessage = async (data) => {
    try {
      const res = await sendMessageToRoomService(data);
      if (res.status === 200) {
        setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessageOfRoom = async (roomChatId) => {
    try {
      const res = await getMessagesOfRoomChatService(roomChatId);
      if (res.status === 200) {
        setMessages(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id > 0 && authUser?.id > 0) {
      console.log("Join new room");
      socket.emit("leave-room", id, authUser?.id);
      socket.emit("join-room", id, authUser?.id);
    }

    socket.on("new-message", async () => {
      console.log("Receive message");
      await fetchMessageOfRoom(id);
    });
    return () => socket.off("new-message");
  }, [id]);

  useEffect(() => {
    if (id > 0) {
      fetchMessageOfRoom(id);
    }
  }, [id]);

  const switchRoomChat = (chatId) => {
    navigate(`/room-chat/${chatId}`);
  };

  return (
    <Layout className="room-chat">
      <ChatList chatList={roomChats} switchRoomChat={switchRoomChat} />
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
                <TextArea
                  placeholder="Gửi đoạn chat"
                  value={content}
                  onChange={(value) => {
                    setContent(value.target.value);
                  }}
                  autoSize
                />
              </Col>
              <Col xxl={1}>
                <Row
                  className="icon-input"
                  style={{ justifyContent: "center" }}
                >
                  <SendOutlined
                    className="send-message-button"
                    onClick={() => {
                      sendMessage({ content: content, roomChatId: id });
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
