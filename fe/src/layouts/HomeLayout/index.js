import { Layout } from "antd";
import Navbar from "../../components/layout/Navbar";
import FooterComponent from "./Footer";
import { useEffect } from "react";
const { Content } = Layout;

const HomeLayout = ({ children, menu }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout className="main-layout">
      <Navbar data={menu} />
      <Content
        className="container-content"
        style={{
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "var(--color-main)",
        }}
      >
        {children}
      </Content>
      <FooterComponent />
    </Layout>
  );
};
export default HomeLayout;
