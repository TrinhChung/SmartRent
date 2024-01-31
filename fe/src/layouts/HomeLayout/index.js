import { Layout } from "antd";
import Navbar from "../../components/layout/Navbar";
import FooterComponent from "./Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const { Content } = Layout;

const HomeLayout = ({ children, menu }) => {
  const [isFooter, setIsFooter] = useState(true);
  const listHiddenFooter = ["room-chat"];
  const location = useLocation();

  useEffect(() => {
    var check = true;
    const currentUrl = location.pathname;
    for (var item of listHiddenFooter) {
      if (currentUrl.includes(item)) {
        check = false;
      }
    }
    setIsFooter(check);

    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Layout className="main-layout">
      <Navbar data={menu} />
      <Content className="container-content">{children}</Content>
      {isFooter && <FooterComponent />}
    </Layout>
  );
};
export default HomeLayout;
