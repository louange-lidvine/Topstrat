import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie("token");
export const baseURL = "https://topstrat-backend.onrender.com";
export const ApiURL = axios.create({
  baseURL: "https://topstrat-backend.onrender.com",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Connection: "keep-alive",
  },
});