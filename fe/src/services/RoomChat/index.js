import axios from "../../config/axios";

export const getRoomChatForMeService = () => {
  return axios.get("/api/room-chat/me");
};

export const sendMessageToRoomService = (data) => {
  return axios.post("/api/message/", data);
};

export const getMessagesOfRoomChatService = (roomChatId) => {
  return axios.get(`/api/message?roomChatId=${roomChatId}`);
};

export const updateNameRoomChatService = (data) => {
  return axios.post("/api/room-chat/change-name", data);
};

export const createTermContractService = (data) => {
  return axios.post(`/api/term/new`, data);
};

export const updateTermContractService = (data) => {
  return axios.put(`/api/term/update`, data);
};

export const updateValueCostTermService = (data) => {
  return axios.put(`/api/term/cost-value/update`, data);
};

export const updateAcceptCostTermService = (data) => {
  return axios.put(`/api/term/cost-accept/update`, data);
};

export const updateValueTimeStartTermService = (data) => {
  return axios.put(`/api/term/time-start-value/update`, data);
};

export const updateAcceptTimeStartTermService = (data) => {
  return axios.put(`/api/term/time-start-accept/update`, data);
};
