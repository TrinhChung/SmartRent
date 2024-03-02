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
      key: "person-info/profile",
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
      key: "person-info/profile",
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
  { key: "3", name: "floor" },
  { key: "4", name: "real-estate" },
];

export const statusRent = [
  { key: "1", name: "rent" },
  { key: "2", name: "negotiating" },
  { key: "3", name: "contracted" },
  { key: "4", name: "closed" },
];

export const typeRooms = [
  { value: "1", label: "Phòng ngủ" },
  { value: "2", label: "Phòng khách" },
  { value: "3", label: "Nhà vệ sinh" },
  { value: "4", label: "Bếp" },
  { value: "5", label: "Phòng khép kín" },
];

export const typeRealEstate = [
  { value: "1", label: "Căn hộ chung cư" },
  { value: "2", label: "Nhà riêng" },
  { value: "3", label: "Biệt thự" },
  { value: "4", label: "Nhà mặt phố" },
  { value: "5", label: "Nhà trọ phòng trọ" },
  { value: "6", label: "Shop house" },
  { value: "7", label: "Văn phòng" },
];
