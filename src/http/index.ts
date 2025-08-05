// src/http/index.ts
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const http = axios.create({ baseURL });

// İstek interceptor'ı: her istekten önce token'ı header'a ekler
http.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem("sb-kwzxuscknzzjnafalzdo-auth-token") || "{}"); // veya sadece token
  const token = session?.access_token;
  console.log(localStorage)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default http;
