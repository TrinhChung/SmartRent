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

export const uploadContractService = (data) => {
  return axios.post("/api/file/upload/contract", data);
};

export const createScService = (data) => {
  return axios.post("/api/contract/create/smart-contract", data);
};

export const uploadFileToIpfs = (data) => {
  return axios.post("/api/contract/uploadIpfs", data);
};

export const renterPaymentDepositService = (data) => {
  return axios.post("/api/contract/deposit/smart-contract", data);
};
