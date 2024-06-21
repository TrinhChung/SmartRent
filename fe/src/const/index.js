import {
  UserOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

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
  1: { value: "Đã hủy bỏ", color: "red", title: "Hợp đồng đã bị hủy", step: 8 },
  2: {
    value: "Hợp đồng hết hạn",
    color: "blue",
    title: "Hợp đồng chấm dứt do hết thời hạn",
    step: 9,
  },
  3: {
    value: "Đang đàm phán",
    color: "yellow",
    title: "Tạo điều khoản",
    step: 1,
  },
  4: {
    value: "Đã ký kết",
    color: "green",
    title: "Nạp tiền đúng hạn để tự động thanh toán",
    step: 5,
  },
  5: {
    value: "Đã thanh toán",
    color: "pink",
    title: "Đã thanh toán",
    step: 4,
  },
  6: {
    value: "Đang thực thi",
    color: "orange",
    title: "Hợp đồng đang được tiến hành",
  },
  7: {
    value: "Người thuê đã ký kết hợp đồng",
    color: "blue",
    title: "Hãy đợi người bán tạo hợp đồng",
    step: 2,
  },
  8: {
    value: "Người bán đã tạo hợp đồng",
    color: "pink",
    title: "Vui lòng chờ người cho thuê thanh toán",
    step: 3,
  },
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

export const steps = [
  {
    title: "Tạo điều khoản",
    icon: <UserOutlined />,
  },
  {
    title: "Ký kết",
    icon: <FontAwesomeIcon icon={faSignature} />,
  },
  {
    title: "Tạo hợp đồng thông minh",
    icon: <SolutionOutlined />,
  },
  {
    title: "Thanh toán tiền thuê",
    icon: <FontAwesomeIcon icon={faCreditCard} />,
  },
  {
    title: "Done",
    icon: <SmileOutlined />,
  },
];
