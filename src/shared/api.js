
import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://18.144.83.110:8080/",
  baseURL: "http://35.174.109.220:8080/",
});

instance.interceptors.request.use((config) => {
const token = localStorage.getItem("token"); // 토큰 헤더에 보내야대면 주석풀어주세용
  // const refreshToken = localStorage.getItem("refresh-token");
config.headers.Authorization = token; //토큰 헤더에 보내야대면 주석풀어주세용
  // config.headers.refreshToken = refreshToken;
  return config;
});

