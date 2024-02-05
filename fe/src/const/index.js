import { UserOutlined } from "@ant-design/icons";

export const settingSlider = {
  className: "center",
  infinite: false,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  pauseHover: false,
  autoplay: true,
  autoplaySpeed: 3000,
};

export const dropdownUser = {
  1: [
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
  ],
  2: [
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
  ],
};

export const typeFile = [
  { key: "1", name: "message" },
  { key: "2", name: "real-estate" },
];

export const statusRent = [
  { key: "1", name: "rent" },
  { key: "2", name: "negotiating" },
  { key: "3", name: "contracted" },
  { key: "4", name: "closed" },
];
