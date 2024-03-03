import React, { useContext } from "react";
import { Row, Col, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
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
    if (notify.type === "1") {
      linkNotify = `/room-chat/${notify.fkId}`;
    }

    if (pathname !== linkNotify) {
      const res = await readNotifyService(notify.id);
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
        {mappingIcon[notify?.type ? notify.type : 1]}
      </Col>
      <Col style={{ alignContent: "center", color: "var(--color-bold)" }}>
        <Row>
          <Paragraph
            style={{ textWrap: "break-word", maxWidth: 300, marginBottom: 0 }}
          >
            {notify.content}
            111111111111111111111111111111111111111111111111111111111111111111
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
