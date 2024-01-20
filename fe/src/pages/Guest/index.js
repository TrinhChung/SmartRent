import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Negotiate from "./negotiate"
import HomeLayout from "../../layouts/HomeLayout";
import LinkCustom from "../../components/layout/LinkCustom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import RoomChat from "./roomChat";

const Guest = () => {
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
      label: <LinkCustom to={"/room-chat/1"} label="Room chat" />,
      key: "room-chat",
    },
    {
      label: <LinkCustom to={"/search"} label="Tìm kiếm" />,
      key: "search",
    },
  ];
  const wrapLayout = (children, isFooter = true) => {
    return (
      <HomeLayout menu={items} isFooter={isFooter}>
        {children}
      </HomeLayout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={wrapLayout(<Home />)} />
      <Route path="/auth/login" element={wrapLayout(<Login />)} />
      <Route path="/negotiating" element={wrapLayout(<Negotiate />)} />
      <Route path="/auth/signup" element={wrapLayout(<SignUp />)} />
      <Route path="/room-chat/:id" element={wrapLayout(<RoomChat />, false)} />
      <Route path="/*" element={wrapLayout(<div>Chua dinh nghia</div>)} />
    </Routes>
  );
};

export default Guest;
