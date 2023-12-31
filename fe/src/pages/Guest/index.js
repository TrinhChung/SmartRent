import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import HomeLayout from "../../layouts/HomeLayout";
import LinkCustom from "../../components/layout/LinkCustom";

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
  ];
  const wrapLayout = (children) => {
    return <HomeLayout menu={items}>{children}</HomeLayout>;
  };
  return (
    <Routes>
      <Route path="/" element={wrapLayout(<Home />)} />
      <Route path="/*" element={wrapLayout(<div>Chua dinh nghia</div>)} />
    </Routes>
  );
};

export default Guest;
