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

export const getFloorByIdService = ({ id: id }) => {
  return axios.get(`/api/floor/${id}`);
};

export const createRoomsService = (data) => {
  return axios.post("/api/room/bulk", data);
};

export const getRoomByIdService = ({ id: id }) => {
  return axios.get(`/api/room/${id}`);
};
