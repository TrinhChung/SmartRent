import React from "react";
import { Row, Col } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import localization from "moment/locale/vi";

const Notify = ({ notify, key = 1 }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const switchToLink = async (notify) => {
    var linkNotify;
    if (notify.type === "1") {
      linkNotify = `/room-chat/${notify.fkId}`;
    }

    if (pathname !== linkNotify) {
      navigate(`/room-chat/${notify.fkId}`);
      // TODO xử lý lại sự kiện đọc
      // Không cần thiết sử dụng socket hãy sử dụng post
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
        <FontAwesomeIcon icon={faMessage} />
      </Col>
      <Col style={{ alignContent: "center", color: "var(--color-bold)" }}>
        <Row style={{}}>{notify.content}</Row>
        <Row style={{ paddingTop: 2, fontSize: 12, lineHeight: "12px" }}>
          {moment(notify.time).fromNow()}
        </Row>
      </Col>
    </Row>
  );
};

export default Notify;
