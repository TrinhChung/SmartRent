import { Row, Col, Avatar } from "antd";
import React from "react";

const Message = ({ message = { content: "message", isOwner: true } }) => {
  return (
    <Row style={{ alignItems: "center" }} gutter={[8]}>
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
      <Col>{message.content}</Col>
    </Row>
  );
};

export default Message;
