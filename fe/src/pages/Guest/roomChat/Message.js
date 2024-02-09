import { Row, Col, Avatar, Tooltip } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../../../providers/authProvider";
import "./Message.scss";
import ImageCustom from "../../../components/pages/ImageCustom";

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
            <Row
              style={{
                justifyContent: `${
                  message.userId === authUser.id ? "end" : "start"
                }`,
                paddingBottom: 8,
                gap: 3,
              }}
              gutter={[3, 3]}
            >
              {message.messageFiles.map((image, index) => {
                return (
                  <div>
                    <ImageCustom
                      src={process.env.REACT_APP_HOST_BE + "/" + image.url}
                      index={index}
                      className="message-image"
                    />
                  </div>
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
