import React, { useContext, useState } from "react";
import { Button, Input, Modal } from "antd";
import { useParams } from "react-router-dom";
import { updateNameRoomChatService } from "../../../services/RoomChat/index";
import { SocketContext } from "../../../providers/socketProvider";

const EditNameRoom = ({
  isOpen = false,
  close = () => {},
  confirm = () => {},
}) => {
  const { getRoomChatForMe } = useContext(SocketContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const changeNameRoomChat = async () => {
    setLoading(true);
    const res = await updateNameRoomChatService({ roomChatId: id, name: name });
    if (res.status === 200) {
      await getRoomChatForMe();
      setName("");
      close();
    }
    setLoading(false);
  };
  return (
    <Modal
      open={isOpen}
      title="Đổi tên phòng"
      onOk={confirm}
      onCancel={close}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={changeNameRoomChat}
        >
          Đổi tên
        </Button>,
        <Button
          key="cancel"
          onClick={() => {
            setName("");
            close();
          }}
        >
          Hủy
        </Button>,
      ]}
    >
      <Input
        placeholder="Tên phòng"
        value={name}
        onChange={(value) => {
          setName(value.target.value);
        }}
      />
    </Modal>
  );
};

export default EditNameRoom;
