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
  console.log("frontend resumeText: ", resumeText);
  console.log("frontend jobDescription: ", jobDescription);
  return axios.post("http://localhost:3000/match", {
    resumeText,
    jobDescription
  });
};

export default api;