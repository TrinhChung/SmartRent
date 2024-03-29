import axios from "../../config/axios";

export const updateUserInfoService = (data) => {
  return axios.put("/api/user/info", data);
};

export const changePasswordService = (data) => {
  return axios.put("/api/user/change-password", data);
};

export const requestForgotPasswordService = (data) => {
  return axios.post("/api/user/request-forgot-password", data);
};

export const resetPasswordService = (data) => {
  return axios.put("/api/user/reset-password", data);
};

export const updateWalletService = (data) => {
  return axios.put("/api/user/update-wallet", data);
};

export const getSignByIdService = (id) => {
  return axios.get(`/api/user/sign/${id}`);
};
