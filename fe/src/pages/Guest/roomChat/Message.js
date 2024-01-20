import { Row, Col, Avatar, Tooltip } from "antd";
import React from "react";
import "./Message.scss";
const Message = ({
  message = { content: "message", isOwner: true },
  key = "chat1",
}) => {
  return (
    <Row
      className="msg"
      style={{
        flexDirection: `${message.isOwner ? "row-reverse" : "row"}`,
      }}
      key={key}
    >
      {!message.isOwner && (
        <Col>
          <Avatar
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
          >
            U
          </Avatar>
        </Col>
      )}

      <Col style={{ paddingLeft: 12 }}>
        <Tooltip title={"Time"} placement="left" arrow={false}>
          <Row className={`${message.isOwner ? "msg-owner" : "msg-partner"}`}>
            {message.content}
          </Row>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default Message;
