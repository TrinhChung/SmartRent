import { Row, Col, Avatar, Tooltip } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../../../providers/authProvider";
import "./Message.scss";

const Message = ({
  message = { content: "message", isOwner: true },
  key = "chat1",
}) => {
  const { authUser } = useContext(AuthContext);

  return (
    <Row
      className="msg"
      style={{
        flexDirection: `${
          message.userId === authUser.id ? "row-reverse" : "row"
        }`,
      }}
      key={key}
    >
      {message.userId !== authUser.id && (
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
          <Row
            className={`${
              message.userId === authUser.id ? "msg-owner" : "msg-partner"
            }`}
          >
            {message.content}
          </Row>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default Message;
