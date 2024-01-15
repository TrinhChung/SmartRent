import { Layout } from "antd";
import Navbar from "../../components/layout/Navbar";
import FooterComponent from "./Footer";
import { useEffect } from "react";
const { Content } = Layout;

const HomeLayout = ({ children, menu, isFooter = true }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout className="main-layout">
      <Navbar data={menu} />
      <Content className="container-content">{children}</Content>
      {isFooter && <FooterComponent />}
    </Layout>
  );
};
export default HomeLayout;
