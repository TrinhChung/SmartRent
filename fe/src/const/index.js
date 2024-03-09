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

export const statusRent = {
  1: { value: "Đang đàm phán", color: "yellow" },
  2: { value: "Đã ký kết", color: "green" },
  3: { value: "Đã thanh toán", color: "pink" },
  4: { value: "Đang thực thi", color: "orange" },
  5: { value: "Đã hủy bỏ", color: "red" },
  6: { value: "Kết thúc hợp đồng", color: "blue" },
};

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

export const maxCost = 19999999999;
