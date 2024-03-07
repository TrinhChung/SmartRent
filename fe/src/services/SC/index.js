import axios from "../../config/axios";

export const getReAddressService = () => {
  return axios.get(`/api/smc/re-address`);
};

export const getReAbiService = () => {
  return axios.get("/api/smc/re-abi");
};
