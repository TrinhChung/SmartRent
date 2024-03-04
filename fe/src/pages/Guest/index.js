import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Negotiate from "./negotiate";
import HomeLayout from "../../layouts/HomeLayout";
import LinkCustom from "../../components/layout/LinkCustom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import FullHouseView from "../Seller/NewPost/FullHouseView";
import Search from "./search";
import RequestForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

const Guest = () => {
  const items = [
    {
      label: <LinkCustom to="/" label="Trang chủ" />,
      key: "home",
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
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/auth/request-forgot-password"
          element={<RequestForgotPassword />}
        />
        <Route path="/full-house-view/:id" element={<FullHouseView />} />
        <Route path="/auth/reset-password/:uuid" element={<ResetPassword />} />
        <Route path="/*" element={<div>Chua dinh nghia</div>} />
      </Routes>
    </HomeLayout>
  );
};

export default Guest;
