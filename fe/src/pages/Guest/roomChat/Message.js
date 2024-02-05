import { Row, Col, Avatar, Tooltip, Image } from "antd";
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
          {message?.messageFiles.length > 0 && (
            <Row style={{ justifyContent: "end", paddingBottom: 8 }}>
              {message.messageFiles.map((image) => {
                return (
                  <Image
                    className="message-image"
                    src={process.env.REACT_APP_HOST_BE + "/" + image.url}
                  />
                );
              })}
            </Row>
          )}
          <Row
            style={{
              justifyContent: `${
                message.userId === authUser.id ? "end" : "start"
              }`,
            }}
          >
            {message.content && (
            <Col
              className={`${
                message.userId === authUser.id ? "msg-owner" : "msg-partner"
              }`}
            >
              {message.content}
            </Col>
            )}
          </Row>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default Message;
