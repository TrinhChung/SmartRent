import { useContext, useEffect } from "react";
import { BellTwoTone } from "@ant-design/icons";
import { Row, Col, Popover, Tabs, Empty, Badge } from "antd";
import "./NotifyDropDown.scss";
import { AuthContext } from "../../providers/authProvider";
import { SocketContext } from "../../providers/socketProvider";
import Notify from "./Notify";

export default function NotifyDropDown() {
  const { socket, notifies, notifiesUr, fetchNotifyOfUser } =
    useContext(SocketContext);
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
      console.log(data);
      await fetchNotifyOfUser();
    });
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
      <Badge count={notifiesUr.length}>
        <BellTwoTone
          style={{ fontSize: "20px", cursor: "pointer" }}
          className="color-icon"
        />
      </Badge>
    </Popover>
  );
}
