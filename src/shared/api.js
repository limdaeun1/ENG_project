import axios from "axios";

export const instance = axios.create({
  baseURL: "",
  // baseURL: "http://3.36.70.96:8080",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // const refreshToken = localStorage.getItem("refresh-token");
  config.headers.Authorization = token;
  // config.headers.refreshToken = refreshToken;
  return config;
});