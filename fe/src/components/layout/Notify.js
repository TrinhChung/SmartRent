import React, { useContext } from "react";
import { Row, Col, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faMessage,
  faHandshakeSlash,
  faFileContract,
  faPenToSquare,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocketContext } from "../../providers/socketProvider";
import moment from "moment";
import localization from "moment/locale/vi";
import { readNotifyService } from "../../services/Notify/index";
const { Paragraph } = Typography;

const Notify = ({ notify, key = 1 }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { fetchNotifyOfUser } = useContext(SocketContext);

  const switchToLink = async (notify) => {
    var linkNotify;
    const idRedirectRoomChat = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (idRedirectRoomChat.includes(notify.type)) {
      linkNotify = `/room-chat/${notify.fkId}`;
    }

    const res = await readNotifyService(notify.id);
    if (
      pathname !== linkNotify &&
      res.status === 200 &&
      idRedirectRoomChat.includes(notify.type)
    ) {
      navigate(`/room-chat/${notify.fkId}`);
    }

    await fetchNotifyOfUser();
  };

  const mappingIcon = {
    1: <FontAwesomeIcon icon={faMessage} />,
    2: <FontAwesomeIcon icon={faHandshakeSlash} />,
    3: <FontAwesomeIcon icon={faFileContract} />,
    4: <FontAwesomeIcon icon={faPenToSquare} />,
    5: <FontAwesomeIcon icon={faMessage} />,
    6: <FontAwesomeIcon icon={faCircleDollarToSlot} />,
    7: <FontAwesomeIcon icon={faFileContract} />,
    8: <FontAwesomeIcon icon={faPenToSquare} />,
    9: <FontAwesomeIcon icon={faPenToSquare} />,
  };

  return (
    <Row
      key={"notify item" + key}
      onClick={() => {
        switchToLink(notify);
      }}
      gutter={[8, 8]}
      className="notify-item"
    >
      <Col style={{ fontSize: 26 }}>
        {mappingIcon[notify?.type ? notify.type : 1]}
      </Col>
      <Col style={{ alignContent: "center", color: "var(--color-bold)" }}>
        <Row>
          <Paragraph
            style={{ textWrap: "break-word", maxWidth: 300, marginBottom: 0 }}
          >
            {notify.content}
          </Paragraph>
        </Row>
        <Row style={{ paddingTop: 2, fontSize: 12, lineHeight: "12px" }}>
          {moment(notify.createdAt).fromNow()}
        </Row>
      </Col>
    </Row>
  );
};

export default Notify;
