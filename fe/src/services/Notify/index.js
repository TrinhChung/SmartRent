import axios from "../../config/axios";

export const getNotifyOfUserService = (id) => {
  return axios.get(`api/notify/infor?id=${id}`);
};

export const handleCreateNotify = (data) => {
  return axios.post(`api/notify/`, data);
};

export const handleChangeReadState = (data) => {
  return axios.post(`api/notify/read-state`, data);
};
