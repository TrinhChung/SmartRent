import { Col, Row, Layout, Input, Image } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./RoomChat.scss";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  SendOutlined,
  FormOutlined,
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
import { uploadFileToSessionService } from "../../../services/UploadFile/index";

const { Footer, Content } = Layout;
const { TextArea } = Input;

const RoomChat = () => {
  const { authUser } = useContext(AuthContext);
  const { id } = useParams();
  const { socket, roomChats } = useContext(SocketContext);
  const [roomChat, setRoomChat] = useState();
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

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
      socket.emit("leave-room", id, authUser?.id);
      socket.emit("join-room", id, authUser?.id);
    }

    socket.on("new-message", async () => {
      await fetchMessageOfRoom(id);
    });
    return () => socket.off("new-message");
  }, [id, authUser]);

  useEffect(() => {
    if (id > 0) {
      fetchMessageOfRoom(id);
    }
  }, [id]);

  useEffect(() => {
    if (roomChats.length > 0) {
      for (var room of roomChats) {
        if (room.id == id) {
          setRoomChat(room);
        }
      }
    }
  }, [roomChats, id]);

  const switchRoomChat = (chatId) => {
    navigate(`/room-chat/${chatId}`);
  };

  const uploadMultipleFiles = async (e) => {
    const listFile = Array.from(e.target.files);
    if (listFile.length > 5) {
      e.preventDefault();
      alert(`Cannot upload files more than 5`);
      return;
    } else if (listFile.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < listFile.length; i++) {
        formData.append("file", listFile[i]);
      }

      try {
        const res = await uploadFileToSessionService(formData);
        if (res.statusCode === 200) {
          console.log(res.message);
        }
      } catch (error) {
        console.log(error);
      }

      var fileBuilt = listFile.map((file) => {
        return {
          name: file.name,
          key: file.name + "*" + file.size,
          url: window.URL.createObjectURL(file),
        };
      });

      setFiles(fileBuilt);
    } else {
      setFiles([]);
    }
  };

  const sendMessage = async (data) => {
    try {
      if ((data.content && data.content.length > 0) || files.length > 0) {
        const res = await sendMessageToRoomService(data);
        if (res.status === 200) {
          setContent("");
          setFiles([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout className="room-chat">
      <ChatList chatList={roomChats} switchRoomChat={switchRoomChat} />
      <Layout className="content-room-chat">
        <Row className="msg-header">
          <Col className="text-bold-18 ">
            {roomChat?.name ? roomChat.name : "RoomChat"}
          </Col>
          <Col>
            <Row gutter={[16]}>
              <Col className="text-bold-18 wrap-icon" style={{ color: "red" }}>
                <DeleteOutlined />
              </Col>
              <Col className="text-bold-18 wrap-icon">
                <FormOutlined />
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
            {files.length > 0 && (
              <Row style={{ paddingBottom: 10, gap: 5 }}>
                {files.map((file) => {
                  return (
                    <Col>
                      <Image
                        src={file?.url}
                        style={{ height: 80, width: 80 }}
                      />
                    </Col>
                  );
                })}
              </Row>
            )}
            <Row className="wrap-input-message">
              <Col xxl={1}>
                <Row style={{ justifyContent: "center" }}>
                  <label className="icon-input" for="input-image-message">
                    <PaperClipOutlined />
                  </label>
                  <input
                    type="file"
                    id="input-image-message"
                    multiple
                    onChange={uploadMultipleFiles}
                    accept="image/*, application/pdf"
                  />
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
                      sendMessage({
                        content: content,
                        roomChatId: id,
                        files: files,
                      });
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
