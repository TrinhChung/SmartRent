import React, { useCallback, useState } from "react";
import { ContainerOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Row, Col } from "antd";
import {} from "@fortawesome/free-solid-svg-icons";
import "./ChatList.scss";
import EditNameRoom from "./EditNameRoom";
import Contract from "./Contract";

const { Sider } = Layout;

const ChatInfo = () => {
  const [isOpenModelEditName, setIsOpenModelEditName] = useState(false);
  const [isOpenModalContract, setIsOpenModalContract] = useState(false);

  const closeModal = useCallback(() => {
    return setIsOpenModelEditName(false);
  }, []);

  const closeModalContract = useCallback(() => {
    return setIsOpenModalContract(false);
  }, []);

  return (
    <Sider className="chat-info" width={360}>
      <Row className="title-sidebar">Thông tin phòng</Row>
      <Row
        className="box-chat-info"
        onClick={() => {
          setIsOpenModalContract(true);
        }}
      >
        <Col>
          <ContainerOutlined />
        </Col>
        <Col className="item-chat-info">Hợp đồng</Col>
      </Row>
      <Row
        className="box-chat-info"
        onClick={() => {
          setIsOpenModelEditName(true);
        }}
      >
        <Col>
          <EditOutlined />
        </Col>
        <Col className="item-chat-info">Đổi tên phòng</Col>
      </Row>
      <Row className="box-chat-info" onClick={() => {}}>
        <Col>
          <EditOutlined />
        </Col>
        <Col className="item-chat-info">Thêm điều khoản</Col>
      </Row>
      <Contract open={isOpenModalContract} handleCancel={closeModalContract} />
      <EditNameRoom isOpen={isOpenModelEditName} close={closeModal} />
    </Sider>
  );
};

export default ChatInfo;
