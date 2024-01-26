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
