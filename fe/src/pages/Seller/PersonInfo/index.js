import React, { memo } from "react";
import { Layout, Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import "./PersonInfo.scss";
import { AppstoreOutlined } from "@ant-design/icons";
import PaymentHistory from "./PaymentHistory";
const { Sider, Footer, Content } = Layout;

const PersonInfo = () => {
  const navigate = useNavigate();
  const items = [
    { label: "Hồ sơ cá nhân", key: "profile", icon: <AppstoreOutlined /> },
    {
      label: "Lịch sử giao dịch",
      key: "payment-history",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Thay đổi mật khẩu",
      key: "reset-password",
      icon: <AppstoreOutlined />,
    },
  ];

  return (
    <Layout className="person-info">
      <Sider className="navigate-sider" width={300}>
        <Menu
          style={{
            width: "100%",
          }}
          defaultSelectedKeys={["profile"]}
          defaultOpenKeys={["profile"]}
          onSelect={(value) => {
            navigate("/person-info/" + value?.key ? value.key : "profile");
          }}
          items={items}
        />
      </Sider>
      <Content className="content">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="payment-history" element={<PaymentHistory />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default memo(PersonInfo);
