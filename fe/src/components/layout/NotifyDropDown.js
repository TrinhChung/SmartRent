import { useContext, useEffect } from "react";
import { BellTwoTone } from "@ant-design/icons";
import { Row, Col, Popover, Tabs, Empty } from "antd";
import "./NotifyDropDown.scss";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider";
import { SocketContext } from "../../providers/socketProvider";
import {
  UpsertMessageNotify,
} from "../../services/Notify";
import Notify from "./Notify";

export default function NotifyDropDown() {
  const { socket, notifies, notifiesUr,fetchNotifyOfUser } = useContext(SocketContext);
  const { pathname } = useLocation();
  const { authUser } = useContext(AuthContext);

  const ListNotify = ({ notifyList }) => {
    if (!notifyList || (notifyList && notifyList.length === 0)) {
      return (
        <Col
          span={24}
          className="list-notify"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Empty></Empty>
        </Col>
      );
    }
    return (
      <Col span={24} className="list-notify">
        {notifyList.map((notify, index) => {
          return <Notify notify={notify} key={index} />;
        })}
      </Col>
    );
  };

  const tabs = [
    {
      key: "1",
      label: (
        <Row className="tab-notify">
          <label>Chưa đọc ({notifiesUr.length})</label>
        </Row>
      ),
      children: <ListNotify notifyList={notifiesUr} />,
    },
    {
      key: "2",
      label: (
        <Row className="tab-notify">
          <label>Đã đọc ({notifies.length})</label>
        </Row>
      ),
      children: <ListNotify notifyList={notifies} />,
    },
  ];

  useEffect(() => {
    socket.on("notification", async (data) => {
      const isRoomChatWithId = `/room-chat/${data.roomChatId}`;
      if (isRoomChatWithId !== pathname) {
        var newNotify = {
          userId: authUser.id,
          fkId: Number(data.roomChatId),
          content: `New message from ${data.userId}`,
          type: "1",
        };
        await UpsertMessageNotify(newNotify);
        await fetchNotifyOfUser();
      }
    });

    return () => {
      socket.off("notification");
    };
  }, [authUser, socket]);

  const NotifyPlace = () => {
    return (
      <Row>
        <Tabs defaultActiveKey="1" centered={true} items={tabs} />
      </Row>
    );
  };

  return (
    <Popover
      content={NotifyPlace}
      overlayClassName="container-notify"
      trigger="click"
      placement="bottomRight"
    >
      <BellTwoTone style={{ fontSize: "20px" }} className="color-icon" />
    </Popover>
  );
}
