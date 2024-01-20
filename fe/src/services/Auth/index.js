import axios from "../../config/axios";

export const loginService = (data) => {
  return axios.post("/api/auth/login", data);
};

export const loginMe = () => {
  return axios.get("/api/auth/me");
};

export const logoutService = () => {
  return axios.get("/api/auth/logout");
};

export const signupService = (data) => {
  return axios.post("/api/auth/register", data);
};

export const forgotPasswordService = (data) => {
  return axios.post("/api/auth/reset_password", data);
};

export const resetPasswordService = (data) => {
  return axios.post("/api/auth/new_password", data);
};
