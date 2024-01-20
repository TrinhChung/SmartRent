import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_HOST_BE,
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return { ...response.data, status: response.status };
  },
  (error) => {
    if (error.response?.data) return Promise.reject(error.response?.data);
    else return error;
  }
);

export default instance;
