import moment from "moment";

export const buildContentCost = (value, addressRe) => {
  return `Bên A cho bên B thuê nhà tại địa chỉ ${addressRe} với mức giá ${String(
    value
  ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ / tháng.`;
};

export const buildContentDeposit = (value) => {
  return `Tiền cọc khi thuê nhà của bên B sẽ là: ${String(value).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  )} VNĐ. Số tiền này sẽ lưu trữ trong hợp đồng thông minh và sẽ được hoàn trả cho bên B sau khi chấm dứt hợp đồng đúng kì hạn. Nếu bên B chấm dứt hợp đồng trước thời hạn số tiền này sẽ được bồi thường cho bên A.`;
};

export const buildTimeStart = (value) => {
  return `Hợp đồng sẽ được bắt đầu từ ngày ${moment(value).format(
    "DD-MM-YYYY"
  )}`;
};

export const buildDeadlinePayment = (value) => {
  return `Tiền sẽ được thanh toán vào ngày ${moment(value).format("DD")} hàng
                    tháng`;
};
