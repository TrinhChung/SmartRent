import { useState, useEffect, useContext, memo } from "react";
import { Layout, Row, Col, Dropdown, Modal } from "antd";
import { BellFilled, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider";
import "./Navbar.scss";

const { Header } = Layout;
const Navbar = ({ data }) => {
  const { authUser } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (pathname) {
      const pathArr = pathname.split("/");
      if (pathArr[1] === "") {
        pathArr[1] = "home";
      }
      setCurrent(pathArr[1]);
    }
  }, [pathname]);

  const onLogout = async () => {};

  const items = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: "Đăng xuất",
      key: "logout",
      icon: <UserOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      setIsOpenModal(true);
    } else {
      navigate(`/${e.key}/`);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Header className="box-shadow-bottom navbar-home">
      <Row className="wrap-border">
        <Col xxl={8} xs={4} className="box-logo">
          <Row style={{ alignItems: "center", justifyContent: "center" }}>
            <Col>
              <Row className="big-name">Smart</Row>
              <Row>Rental</Row>
            </Col>
          </Row>
        </Col>

        <Col xxl={16} xs={20}>
          <Row>
            <Col xxl={16} xs={18} className="box-menu-navbar">
              <Menu
                className="menu-navbar"
                onClick={(e) => {
                  onClick(e);
                }}
                selectedKeys={[current]}
                mode="horizontal"
                items={data}
              />
            </Col>
            <Col xxl={8} xs={6} style={{ paddingRight: 29 }}>
              {authUser ? (
                <Row
                  style={{
                    justifyContent: "flex-end",
                    fontSize: "20px!important",
                    gap: 10,
                  }}
                >
                  <Col>
                    <BellFilled
                      style={{ fontSize: "20px" }}
                      className="color-icon"
                    />
                  </Col>
                  <Col>|</Col>
                  <Dropdown menu={menuProps} trigger={["click"]}>
                    <Row style={{ gap: 5, cursor: "pointer" }}>
                      <Col>
                        <UserOutlined style={{ fontSize: "20px" }} />
                      </Col>
                      <Col>
                        <div>{authUser?.username}</div>
                      </Col>
                    </Row>
                  </Dropdown>
                </Row>
              ) : (
                <Row
                  style={{
                    justifyContent: "flex-end",
                    fontSize: "20px!important",
                    gap: 10,
                  }}
                >
                  <Row
                    style={{ gap: 5, cursor: "pointer" }}
                    onClick={() => {
                      navigate("/auth/login");
                    }}
                  >
                    <Col>
                      <LogoutOutlined style={{ fontSize: "20px" }} />
                    </Col>
                    <Col>
                      <div>Đăng nhập</div>
                    </Col>
                  </Row>
                </Row>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Đăng xuất"
        open={isOpenModal}
        centered={true}
        onOk={() => {
          onLogout();
        }}
        onCancel={() => setIsOpenModal(false)}
      >
        <p>Bạn có muốn đăng xuất không?</p>
      </Modal>
    </Header>
  );
};

export default memo(Navbar);
