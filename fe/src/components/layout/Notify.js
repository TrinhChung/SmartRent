import React, { useContext } from "react";
import { Row, Col } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocketContext } from "../../providers/socketProvider";
import moment from "moment";
import localization from "moment/locale/vi";
import {
  UpsertMessageNotify,
} from "../../services/Notify";

const Notify = ({ notify, key = 1 }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { fetchNotifyOfUser } = useContext(SocketContext);

  const switchToLink = async (notify) => {
    var linkNotify;
    if (notify.type === "1") {
      linkNotify = `/room-chat/${notify.fkId}`;
    }

    if (pathname !== linkNotify) {
      notify.isRead = true;
      const res = await UpsertMessageNotify(notify);
      if (res.status === 200) {
        navigate(`/room-chat/${notify.fkId}`);
        await fetchNotifyOfUser();
      }
    }
  };

  const mappingIcon = {
    1: <FontAwesomeIcon icon={faMessage} />,
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
        {mappingIcon[notify?.type?notify.type:1]}
      </Col>
      <Col style={{ alignContent: "center", color: "var(--color-bold)" }}>
        <Row style={{}}>{notify.content}</Row>
        <Row style={{ paddingTop: 2, fontSize: 12, lineHeight: "12px" }}>
          {moment(notify.createdAt).fromNow()}
        </Row>
      </Col>
    </Row>
  );
};

export default Notify;
