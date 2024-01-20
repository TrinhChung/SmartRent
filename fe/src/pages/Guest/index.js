import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Negotiate from "./negotiate"
import HomeLayout from "../../layouts/HomeLayout";
import LinkCustom from "../../components/layout/LinkCustom";
import Login from "./auth/Login";

const Guest = () => {
  const items = [
    {
      label: <LinkCustom to="/" label="Trang chủ" />,
      key: "home",
    },
    {
      label: <LinkCustom to={"/history"} label="Lịch sử" />,
      key: "history",
    },
    {
      label: <LinkCustom to={"/follow"} label="Theo dõi" />,
      key: "follow",
    },
    {
      label: <LinkCustom to={"/search"} label="Tìm kiếm" />,
      key: "search",
    },
    {
      label: <LinkCustom to={"/negotiate"} label="Đàm phán" />,
      key: "negotiate",
    },
  ];
  const wrapLayout = (children) => {
    return <HomeLayout menu={items}>{children}</HomeLayout>;
  };

  return (
    <Routes>
      <Route path="/" element={wrapLayout(<Home />)} />
      <Route path="/auth/login" element={wrapLayout(<Login />)} />
      <Route path="/negotiate" element={wrapLayout(<Negotiate />)} />
      <Route path="/*" element={wrapLayout(<div>Chua dinh nghia</div>)} />
    </Routes>
  );
};

export default Guest;
