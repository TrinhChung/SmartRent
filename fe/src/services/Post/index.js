import axios from "../../config/axios";

export const createRealEstateService = (data) => {
  return axios.post("/api/real-estate/full-house", data);
};
