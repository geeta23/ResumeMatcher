import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // backend URL
});

// For file uploads (multipart/form-data)
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const matchResume = (resumeText, jobDescription) => {
  //console.log("frontend resumeText: ", resumeText);
  //console.log("frontend jobDescription: ", jobDescription);
  return axios.post(`${api}/match`, {
    resumeText,
    jobDescription
  });
};

export const loginAPI = (email, password) =>
  axios.post("http://localhost:3000/api/auth/login", { email, password });
export const registerAPI = (username, email, password) =>
  axios.post("http://localhost:3000/api/auth/register", { username, email, password });

export default api;