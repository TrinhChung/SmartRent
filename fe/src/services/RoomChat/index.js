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

export const deleteTermContradictionService = (data) => {
  return axios.post("/api/term/contradiction", data);
};
