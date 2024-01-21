import axios from "../../config/axios";

export const getRoomChatForMeService = () => {
  return axios.get("/api/room-chat/me");
};
