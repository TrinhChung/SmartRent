import axios from "../../config/axios";

export const updateUserInfoService = (data) => {
  return axios.put("/api/user/info", data);
};

export const changePasswordService = (data) => {
  return axios.put("/api/user/change-password", data);
};
