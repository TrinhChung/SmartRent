import axios from "../../config/axios";

export const createRealEstateService = (data) => {
  return axios.post("/api/real-estate/full-house", data);
};

export const getRealEstateFullHouseService = ({ id: id }) => {
  return axios.get(`/api/real-estate/full-house/${id}`);
};

export const getPostedByMeService = (query) => {
  return axios.get(`/api/real-estate/posted-by-me${query}`);
};

export const getEstateByRecommendService = () => {
  return axios.get(`/api/real-estate/recommend`);
};

export const searchRealEstateService = (data) => {
  return axios.post(`/api/real-estate/search`, data);
};

export const createContractService = (data) => {
  return axios.post(`/api/contract/`, data);
};

export const closeContractService = (contractId) => {
  return axios.post(`/api/contract/close`, { contractId: contractId });
};

export const getContractByMeService = ({ page = 1 }) => {
  return axios.get(`/api/contract/me?page=${page}`);
};

export const getContractByIdService = ({ id }) => {
  return axios.get(`/api/contract/detail/${id}`);
};
