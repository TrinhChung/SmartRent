import axios from "../../config/axios";

export const updateUserInfoService = (data) => {
  return axios.put("/api/user/info", data);
};
