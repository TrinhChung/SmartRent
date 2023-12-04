import { useState, useEffect, useContext, memo, useRef } from "react";
import { Layout, Row, Col, Dropdown, Modal, Input } from "antd";
import {
  BellFilled,
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
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
  const wrapperDropdown = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [key, setKey] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleSearch = () => {};

  const handleChangeInputSearch = async (e) => {};

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
      <Row>
        <Col
          span={12}
          style={{
            height: 60,
            paddingLeft: 20,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Menu
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              height: 55,
              backgroundColor: "var(--color-main)",
              color: "white",
            }}
            onClick={(e) => {
              onClick(e);
            }}
            selectedKeys={[current]}
            mode="horizontal"
            items={data}
          />
        </Col>

        <Col
          span={7}
          style={{
            fontSize: 50,
            fontWeight: "bold",
            paddingLeft: 55,
          }}
        >
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
            ref={wrapperDropdown}
          >
            <Col span={20}>
              <Input
                placeholder="Tìm truyện"
                className="input-custom"
                defaultValue={key}
                size="large"
                onChange={handleChangeInputSearch}
                allowClear={true}
                onFocus={() => {}}
              />
            </Col>

            <Col span={4} style={{ alignItems: "center" }}>
              <Row
                style={{
                  background: "white",
                  height: 38,
                  justifyContent: "center",
                }}
              >
                <SearchOutlined
                  style={{ cursor: "pointer", color: "var(--color-main)" }}
                  onClick={() => {
                    handleSearch();
                  }}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={5} style={{ paddingRight: 29 }}>
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
      <Modal
        title="Đăng xuất"
        open={isOpenModal}
        centered={true}
        onOk={() => {
          onLogout();
        }}
        onCancel={() => setIsOpenModal(false)}
      >
        <p>'Bạn có muốn đăng xuất không?'</p>
      </Modal>
    </Header>
  );
};

export default memo(Navbar);
