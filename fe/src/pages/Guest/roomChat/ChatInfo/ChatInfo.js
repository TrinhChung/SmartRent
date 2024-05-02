import { useCallback, useState } from "react";
import { ContainerOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Row, Col } from "antd";
import "../ChatList.scss";
import EditNameRoom from "../EditNameRoom";
import StepSign from "../Contract/StepSign";
import ModalContract from "../ModalContract";

const { Sider } = Layout;

const ChatInfo = ({ contract, fetchContractById = () => {} }) => {
  const [isOpenModelEditName, setIsOpenModelEditName] = useState(false);
  const [isOpenModalContract, setIsOpenModalContract] = useState(false);
  const [isOpenModalListTerm, setIsOpenModalListTerm] = useState(false);

  const closeModal = useCallback(() => {
    return setIsOpenModelEditName(false);
  }, []);

  const closeModalContract = useCallback(() => {
    return setIsOpenModalContract(false);
  }, []);

  const closeModalListTerm = useCallback(() => {
    return setIsOpenModalListTerm(false);
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
      <Row
        className="box-chat-info"
        onClick={() => {
          setIsOpenModalListTerm(true);
        }}
      >
        <Col>
          <EditOutlined />
        </Col>
        <Col className="item-chat-info">Tiến hành ký kết</Col>
      </Row>
      <ModalContract
        contract={contract}
        open={isOpenModalContract}
        handleCancel={closeModalContract}
      />
      <EditNameRoom isOpen={isOpenModelEditName} close={closeModal} />

      <StepSign
        contract={contract}
        open={isOpenModalListTerm}
        close={closeModalListTerm}
        fetchContractById={fetchContractById}
      />
    </Sider>
  );
};

export default ChatInfo;
