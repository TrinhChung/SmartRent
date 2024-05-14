export const typeFile = [
  { key: "1", name: "message" },
  { key: "2", name: "real-estate" },
  { key: "3", name: "floor" },
  { key: "5", name: "user" },
  { key: "6", name: "contract" },
];

export const statusRent = [
  { key: "1", name: "cancel" },
  { key: "2", name: "closed" },
  { key: "3", name: "negotiating" },
  { key: "4", name: "contracted" },
  { key: "5", name: "paid" },
  { key: "6", name: "rented" },
  { key: "7", name: "renter sign" },
  { key: "8", name: "seller create sc" },
];

export const typeRooms = [
  { value: "1", label: "Phòng ngủ" },
  { value: "2", label: "Phòng khách" },
  { value: "3", label: "Nhà vệ sinh" },
  { value: "4", label: "Bếp" },
  { value: "5", label: "Phòng khép kín" },
];

export const typeNotifys = [
  { value: "1", label: "New message" },
  { value: "2", label: "Cancel contract" },
  { value: "3", label: "New contract" },
  { value: "4", label: "New term" },
  { value: "5", label: "accept-term" },
  { value: "6", label: "change renter cost" },
  { value: "7", label: "accept renter cost" },
  { value: "8", label: "change time start" },
];

export const messageCreateTermNotify = {
  otherCreate: "Đối tác của bạn vừa thêm 1 điều khoản mới vào hợp đồng",
  costCreate: "Đối tác của bạn đã chỉnh lại giá thuê",
  timeStartCreate:
    "Đối tác của bạn đã chỉnh lại thời gian hợp đồng có hiệu lực",
  otherAccept: "Đối tác đã chấp nhận điều khoản của bạn",
  otherDelete: "Đối tác của bạn đã xóa 1 điều khoản vì xung đột",
  costAccept: "Đối tác đã chấp nhận giá mà bạn đề xuất",
  timeStartAccept:
    "Đối tác đã chấp nhận thời gian hợp đồng có hiệu lực mà bạn đề xuất",
  otherReject: "Đối tác đã từ chối điều khoản của bạn",
  costReject: "Đối tác đã từ chối giá mà bạn đề xuất",
  timeStartReject:
    "Đối tác đã từ chối thời gian hợp đồng có hiệu lực mà bạn đề xuất",
};

export const statusTerm = {
  0: "Create",
  1: "Accept",
  2: "Reject",
  3: "Delete",
};

export const listTermFixed = [
  `- Bên A có trách nhiệm bàn giao đầy đủ bất động sản theo thông tin đã
        đăng cho bên B kể từ khi hợp đồng có hiệu lực.`,
  `- Cả bên A và B có trách nhiệm tuân thủ các quy định bên B đã đặt ra`,
  `- Sau khi hết thời hạn 12 tháng hai bên có thể tiếp tục đàm phán ký
        lại hợp đồng để có thể phù hợp với thị trường.`,
];
