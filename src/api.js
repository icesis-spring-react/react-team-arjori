import axios from "axios";

const springApi = axios.create({
  baseURL: "http://localhost:8080",
});

springApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "session-token": localStorage.getItem("session-token"),
  };
  return config;
});

export default springApi;
