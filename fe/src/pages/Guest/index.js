import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Negotiate from "./negotiate";
import HomeLayout from "../../layouts/HomeLayout";
import LinkCustom from "../../components/layout/LinkCustom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import FullHouseView from "../Seller/NewPost/FullHouseView";
import FloorView from "../Seller/NewPost/FloorView";
import RoomView from "../Seller/NewPost/RoomView";
import Search from "./search";

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
      label: <LinkCustom to={"/search"} label="Tìm kiếm" />,
      key: "search",
    },
  ];

  return (
    <HomeLayout menu={items}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/negotiating" element={<Negotiate />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route
          path="/new-post/full-house-view/:id"
          element={<FullHouseView />}
        />
        <Route path="/new-post/floor-view/:id" element={<FloorView />} />
        <Route path="/new-post/room-view/:id" element={<RoomView />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<div>Chua dinh nghia</div>} />
      </Routes>
    </HomeLayout>
  );
};

export default Guest;
