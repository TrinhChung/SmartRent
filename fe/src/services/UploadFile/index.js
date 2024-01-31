import axios from "../../config/formDataAxios";

export const uploadFileToSessionService = (formData) => {
  return axios.post("/api/file/upload/image", formData);
};
