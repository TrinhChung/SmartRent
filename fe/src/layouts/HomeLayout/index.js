import { Layout } from "antd";
import Navbar from "../../components/layout/Navbar";
import FooterComponent from "./Footer";
import { useEffect, useState } from "react";
const { Content } = Layout;

const HomeLayout = ({ children, menu }) => {
  const [isFooter, setIsFooter] = useState(true);
  const listHiddenFooter = ["room-chat"];

  useEffect(() => {
    const url = window.location.href;
    for (var item of listHiddenFooter) {
      console.log(url);
      if (url.includes(item)) {
        setIsFooter(false);
      }
    }
    window.scrollTo(0, 0);
  }, [window.location.href]);

  return (
    <Layout className="main-layout">
      <Navbar data={menu} />
      <Content className="container-content">{children}</Content>
      {isFooter && <FooterComponent />}
    </Layout>
  );
};
export default HomeLayout;
