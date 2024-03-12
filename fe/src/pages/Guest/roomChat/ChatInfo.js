import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { ContainerOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Row, Col } from "antd";
import {} from "@fortawesome/free-solid-svg-icons";
import "./ChatList.scss";
import EditNameRoom from "./EditNameRoom";
import Contract from "./Contract";
import { getContractByIdService } from "../../../services/RealEstate";
import ListTerm from "./ListTerm";

const { Sider } = Layout;

const ChatInfo = ({ roomChat }) => {
  const [contract, setContract] = useState({});
  const [isOpenModelEditName, setIsOpenModelEditName] = useState(false);
  const [isOpenModalContract, setIsOpenModalContract] = useState(false);
  const [isOpenModalListTerm, setIsOpenModalListTerm] = useState(false);

  const fetchContractById = async () => {
    try {
      if (roomChat?.contract?.id) {
        const res = await getContractByIdService({
          id: roomChat?.contract?.id,
        });
        console.log("Fetch contract");
        console.log(res);
        if (res.status === 200) {
          setContract(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContractById(roomChat?.contract?.id);
  }, [roomChat?.contract?.id]);

  const closeModal = useCallback(() => {
    return setIsOpenModelEditName(false);
  }, []);

  const closeModalContract = useCallback(() => {
    return setIsOpenModalContract(false);
  }, []);

  const closeModalListTerm = useCallback(() => {
    return setIsOpenModalListTerm(false);
  }, []);

  const fetchPassListTerm = async () => {
    console.log("Fetch Contract by fetch pass list term");
    fetchContractById();
  };

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
        <Col className="item-chat-info">Danh sách điều khoản</Col>
      </Row>
      <Contract
        contract={contract}
        open={isOpenModalContract}
        handleCancel={closeModalContract}
      />
      <EditNameRoom isOpen={isOpenModelEditName} close={closeModal} />
      <ListTerm
        contract={contract}
        open={isOpenModalListTerm}
        close={closeModalListTerm}
        fetchContractById={fetchPassListTerm}
      />
    </Sider>
  );
};

export default ChatInfo;
