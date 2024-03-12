import axios from "../../config/axios";

export const getNotifyOfUserService = () => {
  return axios.get(`api/notify/infor`);
};

export const UpsertMessageNotify = (data) => {
  return axios.post(`api/notify/`, data);
};

export const readNotifyService = (id) => {
  return axios.post("api/notify/read", { notifyId: id });
};
