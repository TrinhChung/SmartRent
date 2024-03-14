import axios from "../../config/axios";

export const getReAddressService = () => {
  return axios.get(`/api/smc/re-address`);
};

export const getScAddressService = () => {
  return axios.get(`/api/smc/sc-address`);
};

export const getReAbiService = () => {
  return axios.get("/api/smc/re-abi");
};

export const signContractService = (data) => {
  return axios.put("/api/contract/sign", data);
};

export const getScAbiService = () => {
  return axios.get("/api/smc/sc-abi");
};
