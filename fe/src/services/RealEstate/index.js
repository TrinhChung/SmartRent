import axios from "../../config/axios";

export const createRealEstateService = (data) => {
  return axios.post("/api/real-estate/full-house", data);
};

export const getRealEstateFullHouseService = ({ id: id }) => {
  return axios.get(`/api/real-estate/full-house/${id}`);
};

export const createFloorsService = (data) => {
  return axios.post("/api/floor/bulk", data);
};
