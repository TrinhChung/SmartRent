import { Col, Row, Layout, Input, Image, Empty } from "antd";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import "./RoomChat.scss";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  SendOutlined,
  FormOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Message from "./Message";
import ChatList from "./ChatList";
import ChatInfo from "./ChatInfo/ChatInfo";
import { SocketContext } from "../../../providers/socketProvider";
import {
  getMessagesOfRoomChatService,
  sendMessageToRoomService,
} from "../../../services/RoomChat";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../providers/authProvider";
import { uploadFileToSessionService } from "../../../services/UploadFile/index";
import {
  closeContractService,
  getContractByIdService,
} from "../../../services/RealEstate";
import EditNameRoom from "./EditNameRoom";

const { Footer, Content } = Layout;
const { TextArea } = Input;

const RoomChat = () => {
  const { authUser } = useContext(AuthContext);
  const { id } = useParams();
  const { socket, roomChats, getRoomChatForMe } = useContext(SocketContext);
  const [isOpenModelEditName, setIsOpenModelEditName] = useState(false);
  const [roomChat, setRoomChat] = useState();
  const [messages, setMessages] = useState([]);
  const [contract, setContract] = useState({});
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const chatWindowRef = useRef(null);

  const closeModal = useCallback(() => {
    return setIsOpenModelEditName(false);
  }, []);

  const fetchMessageOfRoom = async (roomChatId) => {
    try {
      const res = await getMessagesOfRoomChatService(roomChatId);
      if (res.status === 200) {
        setMessages(res.data);
      }
      setTimeout(() => {
        chatWindowRef.current.scrollTo(0, chatWindowRef.current.scrollHeight);
      }, 50);
    } catch (error) {
      console.log(error);
    }
  };

  const addMessageToSender = () => {
    try {
      setTimeout(() => {
        chatWindowRef.current.scrollTo(0, chatWindowRef.current.scrollHeight);
      }, 50);
    } catch (error) {
      console.log(error);
    }
  };

  const checkStatusContract = (status) => {
    if (!["1", "2"].includes(status)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (roomChats.length > 0) {
      for (var room of roomChats) {
        if (String(room.id) === String(id)) {
          setRoomChat(room);
          fetchContractById(room?.contract?.id);
        }
      }
    }
  }, [roomChats, id]);

  useEffect(() => {
    if (id > 0 && authUser?.id > 0) {
      socket.emit("leave-room", id, authUser?.id);
      socket.emit("join-room", id, authUser?.id);
    }

    socket.on("new-message", async (data) => {
      if (data !== authUser.id) {
        await fetchMessageOfRoom(id);
      }
    });

    socket.on("update-term", async (data) => {
      if (Number(data?.roomChatId) === Number(id)) {
        await fetchContractById(id);
      }
    });

    return () => {
      socket.off("new-message");

      socket.off("update-term");
    };
  }, [id, authUser]);

  useEffect(() => {
    if (id > 0) {
      fetchMessageOfRoom(id);
    }
  }, [id]);

  const fetchContractById = async (id) => {
    try {
      if (id) {
        const res = await getContractByIdService({
          id: id,
        });
        if (res.status === 200) {
          setContract(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      var fileBuilt = listFile.map((file) => {
        return {
          name: file.name,
          key: file.name + "*" + file.size,
          url: window.URL.createObjectURL(file),
        };
      });

      setFiles(fileBuilt);

      try {
        const res = await uploadFileToSessionService(formData);
        if (res.statusCode === 200) {
          console.log(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setFiles([]);
    }
  };

  const fetchCloseContract = async () => {
    try {
      const res = await closeContractService({
        contractId: roomChat?.contractId,
        roomChatId: roomChat?.id,
      });
      if (res.status === 200) {
        getRoomChatForMe();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const sendMessage = async (data) => {
    try {
      if ((data.content && data.content.length > 0) || files.length > 0) {
        const res = await sendMessageToRoomService(data);
        if (res.status === 200) {
          setContent("");
          setFiles([]);
          fetchMessageOfRoom(id);
          addMessageToSender();
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <Layout className="room-chat">
      <ChatList chatList={roomChats} switchRoomChat={switchRoomChat} />
      <Layout className="content-room-chat">
        <Row className="msg-header">
          <Col className="text-bold-18 ">
            <Row>
              <Col>{roomChat?.name ? roomChat.name : "RoomChat"}</Col>
              <Col
                className="icon-edit-name-room"
                onClick={() => {
                  setIsOpenModelEditName(true);
                }}
              >
                <EditOutlined />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={[16]}>
              <Col className="text-bold-18 wrap-icon" style={{ color: "red" }}>
                <DeleteOutlined
                  onClick={() => {
                    fetchCloseContract();
                  }}
                />
              </Col>
              <Col className="text-bold-18 wrap-icon">
                <FormOutlined />
              </Col>
              <Col className="text-bold-18 wrap-icon">
                <InfoCircleOutlined />
              </Col>
            </Row>
          </Col>
        </Row>
        <Content className="msg-body" ref={chatWindowRef}>
          {messages?.length > 0 ? (
            messages.map((message, index) => {
              return <Message message={message} key={`chat${index}`} />;
            })
          ) : (
            <Row style={{ justifyContent: "center" }}>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 200,
                }}
                description="Chưa có tin nhắn nào!"
              ></Empty>
            </Row>
          )}
        </Content>
        <Footer className="input-message">
          <Col span={24}>
            {files.length > 0 && (
              <Row style={{ paddingBottom: 10, gap: 5 }}>
                {files.map((file, index) => {
                  return (
                    <Col index={"keyImage" + index}>
                      <Image
                        src={file?.url}
                        style={{ height: 80, width: 80 }}
                      />
                    </Col>
                  );
                })}
              </Row>
            )}
            {checkStatusContract(roomChat?.contract?.status) ? (
              <Row className="wrap-input-message">
                <Col span={1}>
                  <Row style={{ justifyContent: "center" }}>
                    <label className="icon-input" for="input-image-message">
                      <PaperClipOutlined />
                    </label>
                    <input
                      type="file"
                      id="input-image-message"
                      multiple
                      disabled={
                        !checkStatusContract(roomChat?.contract?.status)
                      }
                      onChange={uploadMultipleFiles}
                      accept="image/*, application/pdf"
                    />
                  </Row>
                </Col>
                <Col span={22}>
                  <TextArea
                    placeholder="Gửi đoạn chat"
                    value={content}
                    onChange={(value) => {
                      setContent(value.target.value);
                    }}
                    autoSize
                    disabled={!checkStatusContract(roomChat?.contract?.status)}
                  />
                </Col>
                <Col span={1}>
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
            ) : (
              <Row
                className="wrap-input-message"
                style={{ justifyContent: "center" }}
              >
                <label
                  style={{
                    marginTop: 4,
                    color: "red",
                    fontSize: 16,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  Hợp đồng đã đóng
                </label>
              </Row>
            )}
          </Col>
        </Footer>
      </Layout>
      <ChatInfo contract={contract} fetchContractById={fetchContractById} />
      <EditNameRoom isOpen={isOpenModelEditName} close={closeModal} />
    </Layout>
  );
};

export default RoomChat;
