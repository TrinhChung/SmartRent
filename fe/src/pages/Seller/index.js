import { Routes, Route } from "react-router-dom";
import Home from "../Guest/home";
import Negotiate from "../Guest/negotiate";
import RoomChat from "../Guest/roomChat";

import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useContext } from "react";
import { SocketContext } from "../../providers/socketProvider";
import LinkCustom from "../../components/layout/LinkCustom";
import FullHouse from "./NewPost/FullHouse";
import NewPost from "./NewPost";
import FullHouseView from "./NewPost/FullHouseView";
import Floor from "./NewPost/Floor";
import FloorView from "./NewPost/FloorView";
import FormRoom from "./NewPost/FormRoom";
import RoomView from "./NewPost/RoomView";
import ListPost from "./ListPost";
import Search from "../Guest/search";

const Seller = () => {
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
      label: <LinkCustom to={`/list-post`} label="Bài đăng" />,
      key: "list-post",
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
        <Route path="/new-post/" element={<NewPost />} />
        <Route path="/new-post/full-house" element={<FullHouse />} />
        <Route path="/new-post/new-floor" element={<Floor />} />
        <Route path="/new-post/new-room" element={<FormRoom />} />
        <Route path="/room-chat/:id" element={<RoomChat />} />
        <Route path="/full-house-view/:id" element={<FullHouseView />} />
        <Route path="/floor-view/:id" element={<FloorView />} />
        <Route path="/room-view/:id" element={<RoomView />} />
        <Route path="list-post" element={<ListPost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<div>Chua dinh nghia</div>} />
      </Routes>
    </HomeLayout>
  );
};

export default Seller;
