import { useState, useEffect, useContext, memo } from "react";
import { Layout, Row, Col, Dropdown, Modal } from "antd";
import { BellFilled, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider";
import { toast } from "react-toastify";
import "./Navbar.scss";
import { logoutService } from "../../services/Auth";
import { dropdownUser } from "../../const/index";
import NotifyDropDown from "./NotifyDropDown";
import { SocketContext } from "../../providers/socketProvider";

const { Header } = Layout;
const Navbar = ({ data }) => {
  const { socket } = useContext(SocketContext);
  const { authUser, setAuthUser } = useContext(AuthContext);
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

  const onLogout = async () => {
    try {
      const res = await logoutService();

      //disconnect meta mask
      await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
      socket.disconnect();

      if (res.status === 200) {
        toast.success("Đã đăng xuất");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    setAuthUser(null);
    setIsOpenModal(false);
    navigate("/");
  };

  const items = dropdownUser[authUser?.role ? authUser.role : 1];

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
                    <NotifyDropDown></NotifyDropDown>
                  </Col>
                  <Col></Col>
                  <Dropdown menu={menuProps} trigger={["click"]}>
                    <Row style={{ gap: 5, cursor: "pointer" }}>
                      <Col>
                        <UserOutlined style={{ fontSize: "20px" }} />
                      </Col>
                      <Col>
                        <div>{authUser?.fullName}</div>
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
