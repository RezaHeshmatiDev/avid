import axios from "axios";
import { getToken } from "../utils/getToken";

const instance = axios.create({
  baseURL: "https://api-admin.agah.me/api/v1",
});

instance.interceptors.request.use((config) => {
  if (getToken()) config.headers.Authorization = `Bearer ${getToken()}`;
  config.headers.accept = "application/json";

  return config;
});

export default instance;
