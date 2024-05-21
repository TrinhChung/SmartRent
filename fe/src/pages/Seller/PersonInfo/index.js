import React, { memo } from "react";
import { Layout, Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import "./PersonInfo.scss";
import { AppstoreOutlined } from "@ant-design/icons";
import PaymentHistory from "./PaymentHistory";
import ChangePassword from "./ChangePassword";
const { Sider, Content } = Layout;

const PersonInfo = () => {
  const navigate = useNavigate();
  const items = [
    { label: "Hồ sơ cá nhân", key: "profile", icon: <AppstoreOutlined /> },
    {
      label: "Ví cá nhân",
      key: "my-wallet",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Thay đổi mật khẩu",
      key: "change-password",
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
          <Route path="profile" element={<Profile />} />
          <Route path="my-wallet" element={<PaymentHistory />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default memo(PersonInfo);
