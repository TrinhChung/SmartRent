import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Guest/home";
import Negotiate from "../Guest/negotiate";
import RoomChat from "../Guest/roomChat";
import HomeLayout from "../../layouts/HomeLayout";
import { useContext } from "react";
import { SocketContext } from "../../providers/socketProvider";
import LinkCustom from "../../components/layout/LinkCustom";

const Renter = () => {
  const { roomChats } = useContext(SocketContext);
  const roomChatId = roomChats.length > 0 ? roomChats[0].id : 0;

  const items = [
    {
      label: <LinkCustom to="/" label="Trang chủ" />,
      key: "home",
    },
    {
      label: <LinkCustom to={"/negotiating"} label="Đàm phán" />,
      key: "negotiating",
    },
    {
      label: <LinkCustom to={`/room-chat/${roomChatId}`} label="Room chat" />,
      key: "room-chat",
    },
    {
      label: <LinkCustom to={"/search"} label="Tìm kiếm" />,
      key: "search",
    },
  ];

  return (
    <HomeLayout menu={items} isFooter={true}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/negotiating" element={<Negotiate />} />
        <Route path="/room-chat/:id" element={<RoomChat />} />
        <Route path="/*" element={<div>Chua dinh nghia</div>} />
      </Routes>
    </HomeLayout>
  );
};

export default Renter;