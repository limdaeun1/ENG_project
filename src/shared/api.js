
import axios from "axios";

export const instance = axios.create({

 
  baseURL: process.env.REACT_APP_ENG_FLUENCER,

});

instance.interceptors.request.use((config) => {
const token = localStorage.getItem("token"); // 토큰 헤더에 보내야대면 주석풀어주세용
  // const refreshToken = localStorage.getItem("refresh-token");
config.headers.Authorization = token; //토큰 헤더에 보내야대면 주석풀어주세용
  // config.headers.refreshToken = refreshToken;
  return config;
});

